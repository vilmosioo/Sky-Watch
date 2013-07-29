<?php
class V1_NgcController extends Zend_Controller_Action
{
    private $info = array();

	public function init(){
    	$this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);

        // ensure database table
        $db = Zend_Registry::get('db');
        // for debug purposes
        // $db->query('DROP TABLE IF EXISTS names;DROP TABLE IF EXISTS ngc;'); 
        if(!in_array('ngc', $db->listTables()) || !in_array('names', $db->listTables())){
            // create table query
            $sql = "DROP TABLE IF EXISTS ngc; CREATE TABLE IF NOT EXISTS ngc (".
                "id INTEGER NOT NULL AUTO_INCREMENT,".
                "RAh INTEGER DEFAULT NULL,".
                "RAm FLOAT DEFAULT NULL,".
                "DEd INTEGER DEFAULT NULL,".
                "DEm FLOAT DEFAULT NULL,".
                "type text DEFAULT NULL,".
                "constelation text DEFAULT NULL,".
                "magnitude FLOAT DEFAULT NULL,".
                "size_min FLOAT DEFAULT NULL,".
                "size_max FLOAT DEFAULT NULL,".
                "number_of_stars INTEGER DEFAULT NULL,".
                "class text DEFAULT NULL,".
                "PRIMARY KEY (id)".
            ");".
            "DROP TABLE IF EXISTS names; CREATE TABLE IF NOT EXISTS names (".
              "id INTEGER NOT NULL AUTO_INCREMENT,".
              "ngc INTEGER NOT NULL,".
              "name text NOT NULL,".
              "PRIMARY KEY (id)".
              // "UNIQUE KEY ngc (ngc)".
            ");".
            "ALTER TABLE names ADD CONSTRAINT names_ibfk_1 FOREIGN KEY (ngc) REFERENCES ngc (id);";
            $db->query($sql);

            // populate table from CSV file
            $handle = @fopen(APPLICATION_PATH . '/modules/v1/db/SAC_DeepSky_Ver81_QCQ.txt', "r");

            $ngcs = array();
            $ngc_names = array();

            if ($handle) {
                $i = 0;
                $types = Zend_Registry::get('types');
                $constellations = Zend_Registry::get('constellations');
                $names = Zend_Registry::get('names');
                
                while (($buffer = fgets($handle, 4096)) !== false) {
                    $i++;
                    try{
                        $temp = explode(',', preg_replace("/\s+/", " ", str_replace('"', '', $buffer)));
                        // performace very slow, need to improve
                        array_push($ngcs, array(
                            'id' => $i,
                            'type' => @$types[trim($temp[2])] ? $types[trim($temp[2])] : '',
                            'constelation' => @$constellations[strtolower(trim($temp[3]))] ? $constellations[strtolower(trim($temp[3]))] : '',
                            'RAh' => explode(" ", trim($temp[4]))[0],
                            'RAm' => explode(" ", trim($temp[4]))[1],
                            'DEd' => explode(" ", trim($temp[5]))[0],
                            'DEm' => explode(" ", trim($temp[5]))[1],
                            'magnitude' => trim($temp[6]),
                            'size_max' => trim($temp[10]),
                            'size_min' => trim($temp[11]),
                            'number_of_stars' => trim($temp[14]),
                            'class' => trim($temp[13]) // only for galaxies
                        ));
                        
                        $id = $i;
                        if(trim($temp[0])){ 
                            array_push($ngc_names, array(
                                'ngc' => $id,
                                'name' => trim($temp[0])                                
                            ));
                        }
                        if(trim($temp[1])){ 
                            array_push($ngc_names, array(
                                'ngc' => $id,
                                'name' => trim($temp[1])
                            ));
                        }
                        $common_name = @$names[trim($temp[0])];
                        if($common_name) {
                            array_push($ngc_names, array(
                                'id' => $id,
                                'name' => $common_name
                            ));     
                        }
                        $common_name = @$names[trim($temp[1])];
                        if($common_name) {
                            array_push($ngc_names, array(
                                'id' => $id,
                                'name' => $common_name
                            ));     
                        }
                    }
                    catch(Exception $e){
                        // die silently
                        $this->info['error'] = array('message' => 'Failed to insert row '.$i, 'exception' => $e);
                    }
                }

                $sql = "INSERT INTO ngc (id, type, constelation, RAh, RAm, DEd, DEm, magnitude, size_max, size_min, number_of_stars, class) VALUES ";
                for($i = 0; $i < count($ngcs) - 1; $i++){
                    $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ";
                }
                $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                $values = array();
                foreach ($ngcs as $key => $value) {
                    foreach ($value as $key1 => $value1) {
                        array_push($values, $value1 ? $value1 : ' ');
                    }
                }
                
                $stmt = $db->prepare($sql); 
                $stmt->execute( $values );

                $sql = "INSERT INTO names (ngc, name) VALUES ";
                for($i = 0; $i < count($ngc_names) - 1; $i++){
                    $sql .= "(?, ?), ";
                }
                $sql .= "(?, ?)";

                $values = array();
                foreach ($ngc_names as $key => $value) {
                    foreach ($value as $key1 => $value1) {
                        array_push($values, $value1 ? $value1 : ' ');
                    }
                }

                $stmt = $db->prepare($sql); 
                $stmt->execute( $values );
                
                if (!feof($handle)) {
                    $this->info['error'] = "Error: unexpected fgets() fail\n";
                }
                fclose($handle);
            }
        }
    }

    public function headAction()
    {
        // you should add your own logic here to check for cache headers from the request
        $this->getResponse()->setBody(null);
    }

    public function optionsAction()
    {
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHeader('Allow', 'OPTIONS, HEAD, INDEX, GET, POST, PUT, DELETE');
    }

    public function indexAction()
    {
        extract($this->_request->getParams());
        $limit = !empty($limit) && is_numeric($limit) && $limit < 50 ? $limit : 50;
        $offset = !empty($offset) && is_numeric($offset) ? $offset : 0;
        
        $body = array('title' => 'New General Catalogue and Index Catalogue');
        
        $ngc_table = new V1_Model_DbTable_NGC();
        $names_table = new V1_Model_DbTable_Names();
        
        $results = $ngc_table->fetchAll($ngc_table->select()->limit($limit, $offset))->toArray();
        foreach ($results as $key => $value) {
            $results[$key]['names'] = array();
            $names = $names_table->fetchAll($names_table->select()->where('ngc = ?', $value['id']))->toArray();
            foreach ($names as $key1 => $value1) {
                array_push($results[$key]['names'], $value1['name']);
            }
        }
        $body['info'] = $this->info;
        $body['results'] = $results;

        $this->getResponse()->setBody(!empty($callback) ? "{$callback}(" . json_encode($body) . ")" : json_encode($body));
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction(){ 
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);
    }

    public function postAction()
    {
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);
    }

    public function putAction()
    {
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);
    }

    public function deleteAction()
    {
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);
    }

}


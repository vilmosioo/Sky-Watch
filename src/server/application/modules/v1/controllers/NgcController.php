<?php
class V1_NgcController extends Zend_Controller_Action
{
    private $info = array();

	public function init(){
    	$this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);
        $this->getResponse()->setHeader('Cache-Control', 'max-age='.(6*24*3600).', public', true); // cache for 6 hours 

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
            "ALTER TABLE names ADD CONSTRAINT names_ibfk_1 FOREIGN KEY (ngc) REFERENCES ngc (id) ON DELETE CASCADE ON UPDATE CASCADE;";
            $db->query($sql);

            // populate table from CSV file
            $data = @file(APPLICATION_PATH . '/modules/v1/db/SAC_DeepSky_Ver81_QCQ.TXT');
        
            $ngcs = array();
            $ngc_names = array();

            if (!empty($data)) {
                $i = 0;
                $types = Zend_Registry::get('types');
                $constellations = Zend_Registry::get('constellations');
                $names = Zend_Registry::get('names');
                
                foreach ($data as $key => $value) {
                    $i++;
                    try{
                        $temp = explode(',', preg_replace("/\s+/", " ", str_replace('"', '', $value)));
                        $RA = explode(" ", trim($temp[4]));
                        $DE = explode(" ", trim($temp[5]));

                        array_push($ngcs, array(
                            'id' => $i,
                            'type' => @$types[trim($temp[2])] ? $types[trim($temp[2])] : '',
                            'constelation' => @$constellations[strtolower(trim($temp[3]))] ? $constellations[strtolower(trim($temp[3]))] : '',
                            'RAh' => $RA[0],
                            'RAm' => $RA[1],
                            'DEd' => $DE[0],
                            'DEm' => $DE[1],
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

                        // insert every 100 records
                        if($i % 100 == 0){
                            $sql = "INSERT INTO ngc (id, type, constelation, RAh, RAm, DEd, DEm, magnitude, size_max, size_min, number_of_stars, class) VALUES ";
                            for($j = 0; $j < count($ngcs) - 1; $j++){
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
                            $ngcs = array();

                            $sql = "INSERT INTO names (ngc, name) VALUES ";
                            for($j = 0; $j < count($ngc_names) - 1; $j++){
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
                            $ngc_names = array();
                        }
                    }
                    catch(Exception $e){
                        // die silently
                        $this->info['error'] = array('message' => 'Failed to insert row '.$i, 'exception' => $e);
                    }
                }
            } else {
                $this->info['error'] = array('message' => 'Could not open file.');
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
        $orderby = !empty($orderby) && in_array($orderby, array('magnitude', 'RA', 'DE')) ? $orderby : 'magnitude';
        $desc = !empty($desc) && in_array($desc, array('DESC', 'ASC')) ? $desc : 'ASC';

        if($orderby == 'RA'){
            $orderby = array("RAh $desc", "RAm $desc");
        } else if($orderby == 'DE'){
            $orderby = array("DEd $desc", "DEm $desc");
        } else {
            $orderby .= ' ' . $desc;
        }

        $body = array('title' => 'New General Catalogue and Index Catalogue');
        
        $ngc_table = new V1_Model_DbTable_NGC();
        $items = array();

        $results = $ngc_table->fetchAll($ngc_table->select()->order($orderby)->limit($limit, $offset));
        foreach ($results as $key => $value) {
            array_push($items, $value->normalize());
        }
        $body['results'] = $items;
        
        // add any additional information generated
        if(!empty($this->info)){
            $body['info'] = $this->info;
        }
        
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


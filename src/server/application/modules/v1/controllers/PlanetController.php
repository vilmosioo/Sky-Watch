<?php
class V1_PlanetController extends Zend_Controller_Action
{
    private $info = array();

  public function init(){
      $this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);

        // ensure database table
        $db = Zend_Registry::get('db');
        // for debug purposes
        $db->query('DROP TABLE IF EXISTS planet;'); 
        if(!in_array('planet', $db->listTables())){
            // create table query
            $sql = "DROP TABLE IF EXISTS planet; CREATE TABLE IF NOT EXISTS planet (".
                "id INTEGER NOT NULL AUTO_INCREMENT,".
                "name text DEFAULT NULL,".
                "PRIMARY KEY (id)".
            ");";
            $db->query($sql);

            // populate table from CSV file
            $data = @file(APPLICATION_PATH . '/modules/v1/db/planet.TXT');
        
            $planets = array();

            if (!empty($data)) {
                foreach ($data as $key => $value) {
                    try{
                        $temp = explode(',', preg_replace("/\s+/", " ", str_replace('"', '', $value)));
                        
                        array_push($planets, array(
                            'name' => trim($temp[2]),
                        ));
                        
                        // insert every 100 records
                        if($i % 100 == 0){
                            $sql = "INSERT INTO planet (name) VALUES ";
                            for($j = 0; $j < count($planets) - 1; $j++){
                                $sql .= "(?), ";
                            }
                            $sql .= "(?)";

                            $values = array();
                            foreach ($planets as $key => $value) {
                                foreach ($value as $key1 => $value1) {
                                    array_push($values, $value1 ? $value1 : ' ');
                                }
                            }
                            
                            $stmt = $db->prepare($sql); 
                            $stmt->execute( $values );
                            $planets = array();
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
        
        $body = array('title' => 'Planets');
        
        $planet_table = new V1_Model_DbTable_Planet();
        
        $results = $planet_table->fetchAll($planet_table->select())->toArray();
        $body['results'] = $results;
        
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


<?php
class V1_PlanetController extends Zend_Controller_Action
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
    // $db->query('DROP TABLE IF EXISTS ephemerid;DROP TABLE IF EXISTS planet;'); 
    if(!in_array('planet', $db->listTables()) || !in_array('ephemerid', $db->listTables())){
      // create table query
      $sql = "DROP TABLE IF EXISTS planet; CREATE TABLE IF NOT EXISTS planet (".
          "id INTEGER NOT NULL AUTO_INCREMENT,".
          "name text DEFAULT NULL,".
          "PRIMARY KEY (id)".
        ");".
        "DROP TABLE IF EXISTS ephemerid;CREATE TABLE IF NOT EXISTS ephemerid (".
          "id INTEGER NOT NULL AUTO_INCREMENT,".
          "planet INTEGER NOT NULL,".
          "JD DOUBLE NOT NULL,".
          "RAh INTEGER NOT NULL,".
          "RAm INTEGER NOT NULL,".
          "RAs FLOAT NOT NULL,".
          "DEd INTEGER NOT NULL,".
          "DEm INTEGER NOT NULL,".
          "DEs FLOAT NOT NULL,".
          "size FLOAT NOT NULL,".
          "magnitude FLOAT NOT NULL,".
          "constellation text NOT NULL,".
          "PRIMARY KEY (id)".
        ");".
        "ALTER TABLE ephemerid".
        "ADD CONSTRAINT ephemerid_ibfk_1 FOREIGN KEY (planet) REFERENCES planet (id) ON DELETE CASCADE ON UPDATE CASCADE"
      ;
      $db->query($sql);

      $planets = array("Mercury", "Venus", "Mars", "Jupiter", "Uranus", "Neptune");
      $sql = "INSERT INTO planet (name) VALUES ";
      for($j = 0; $j < count($planets) - 1; $j++){
        $sql .= "(?), ";
      }
      $sql .= "(?)";

      $values = array();
      foreach ($planets as $key => $value) {
        array_push($values, $value ? $value : ' ');
      }
      
      $stmt = $db->prepare($sql); 
      $stmt->execute( $values );

      $constellations = Zend_Registry::get('constellations');
      
      foreach ($planets as $id => $planet) {
        // populate table from CSV file
        $data = @file(APPLICATION_PATH . "/modules/v1/db/planets/".strtolower($planet).".txt");
        $ephemerids = array();
        $i = 0;

        if (!empty($data)) {
          foreach ($data as $key => $value) {
            $i++;
            try{
              $temp = explode(',', preg_replace("/\s+/", " ", str_replace('"', '', $value)));
              $RA = explode(" ", trim($temp[1]));              
              $DE = explode(" ", trim($temp[2])); 
              $item = array(
                'planet' => $id + 1,
                'JD' => floatval($temp[0]),
                'RAh' => intval($RA[0]),
                'RAm' => intval($RA[1]),
                'RAs' => floatval($RA[2]),
                'DEd' => intval($DE[0]),
                'DEm' => intval($DE[1]),
                'DEs' => floatval($DE[2]),
                'size' => floatval($temp[5]),
                'magnitude' => floatval($temp[3]),
                'constellation' => @$constellations[strtolower(trim($temp[6]))] ? $constellations[strtolower(trim($temp[6]))] : '',
              );
              
              array_push($ephemerids, $item);
              
              // insert every 100 records
              if($i % 100 == 0){
                $sql = "INSERT INTO ephemerid (planet, JD, RAh, RAm, RAs, DEd, DEm, DEs, size, magnitude, constellation) VALUES ";
                for($j = 0; $j < count($ephemerids) - 1; $j++){
                  $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?), ";
                }
                $sql .= "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                $values = array();
                foreach ($ephemerids as $key => $value) {
                  foreach ($value as $key1 => $value1) {
                    array_push($values, $value1 ? $value1 : ' ');
                  }
                }
                $stmt = $db->prepare($sql); 
                $stmt->execute( $values );
                $ephemerids = array();
              }
            }
            catch(Exception $e){
              // die silently
              $this->info['error'] = array('message' => 'Failed to insert row '.$i, 'exception' => $e);
            }
          }
        } else {
          if(empty($this->info['error'])){
            $this->info['error'] = array();
          }
          $this->info['error'][$planet.'.txt'] = array('message' => 'Could not open file');
        }
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

        $results = $planet_table->fetchAll($planet_table->select());
        
        $items = array();
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


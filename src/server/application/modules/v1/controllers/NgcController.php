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
        $db->query('DROP TABLE IF EXISTS ngc;'); // for debug purposes
        if(!in_array('ngc', $db->listTables())){
            // create table query
            $sql = "CREATE TABLE IF NOT EXISTS ngc (".
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
            ")";
            $db->query($sql);

            // populate table from CSV file
            $handle = @fopen(APPLICATION_PATH . '/modules/v1/db/SAC_DeepSky_Ver81_QCQ.txt', "r");
            if ($handle) {
                $i = 0;
                $types = array(
                    'ASTER' =>  'Asterism',
                    'BRTNB' =>  'Bright Nebula',
                    'CL+NB' =>  'Cluster with Nebulosity',
                    'DRKNB' =>  'Dark Nebula',
                    'GALCL' =>  'Galaxy cluster',
                    'GALXY' =>  'Galaxy',
                    'GLOCL' =>  'Globular Cluster',
                    'GX+DN' =>  'Diffuse Nebula in a Galaxy',
                    'GX+GC' =>  'Globular Cluster in a Galaxy',
                    'G+C+N' =>  'Cluster with Nebulosity in a Galaxy',
                    'LMCCN' =>  'Cluster with Nebulosity in the LMC',
                    'LMCDN' =>  'Diffuse Nebula in the LMC',
                    'LMCGC' =>  'Globular Cluster in the LMC',
                    'LMCOC' =>  'Open cluster in the LMC',
                    'NONEX' =>  'Nonexistent',
                    'OPNCL' =>  'Open Cluster',
                    'PLNNB' =>  'Planetary Nebula',
                    'SMCCN' =>  'Cluster with Nebulosity in the SMC',
                    'SMCDN' =>  'Diffuse Nebula in the SMC',
                    'SMCGC' =>  'Globular Cluster in the SMC',
                    'SMCOC' =>  'Open cluster in the SMC',
                    'SNREM' =>  'Supernova Remnant',
                    'QUASR' =>  'Quasar',
                    '1STAR' =>  '1 Star',
                    '2STAR' =>  '3 Stars',
                    '3STAR' =>  '3 Stars',
                    '4STAR' =>  '4 Stars',
                    '5STAR' =>  '5 Stars',
                    '6STAR' =>  '6 Stars',
                    '7STAR' =>  '7 Stars',
                    '8STAR' =>  '8 Stars',
                    '9STAR' =>  '9 Stars',
                    '10STAR' =>  '10 Stars',
                    '11STAR' =>  '11 Stars',
                    '12STAR' =>  '12 Stars',
                    '13STAR' =>  '13 Stars',
                    '14STAR' =>  '14 Stars',
                    '15STAR' =>  '15 Stars',
                    '16STAR' =>  '16 Stars',
                );
                $constellations = array(
                    "and" => "Andromeda",
                    "ant" => "Antlia",
                    "aps" => "Apus",
                    "aqr" => "Aquarius",
                    "aql" => "Aquila",
                    "ara" => "Ara",
                    "ari" => "Aries",
                    "aur" => "Auriga",
                    "boo" => "Boötes",
                    "cae" => "Caelum",
                    "cam" => "Camelopardalis",
                    "cnc" => "Cancer",
                    "cvn" => "Canes Venatici",
                    "cma" => "Canis Major",
                    "cmi" => "Canis Minor",
                    "cap" => "Capricornus",
                    "car" => "Carina",
                    "cas" => "Cassiopeia",
                    "cen" => "Centaurus",
                    "cep" => "Cepheus",
                    "cet" => "Cetus",
                    "cha" => "Chamaeleon",
                    "cir" => "Circinus",
                    "col" => "Columba",
                    "com" => "Coma Berenices",
                    "cra" => "Corona Austrina",
                    "crb" => "Corona Borealis",
                    "crv" => "Corvus",
                    "crt" => "Crater",
                    "cru" => "Crux",
                    "cyg" => "Cygnus",
                    "del" => "Delphinus",
                    "dor" => "Dorado",
                    "dra" => "Draco",
                    "equ" => "Equuleus",
                    "eri" => "Eridanus",
                    "for" => "Fornax",
                    "gem" => "Gemini",
                    "gru" => "Grus",
                    "her" => "Hercules",
                    "hor" => "Horologium",
                    "hya" => "Hydra",
                    "hyi" => "Hydrus",
                    "ind" => "Indus",
                    "lac" => "Lacerta",
                    "leo" => "Leo",
                    "lmi" => "Leo Minor",
                    "lep" => "Lepus",
                    "lib" => "Libra",
                    "lup" => "Lupus",
                    "lyn" => "Lynx",
                    "lyr" => "Lyra",
                    "men" => "Mensa",
                    "mic" => "Microscopium",
                    "mon" => "Monoceros",
                    "mus" => "Musca",
                    "nor" => "Norma",
                    "oct" => "Octans",
                    "oph" => "Ophiuchus",
                    "ori" => "Orion",
                    "pav" => "Pavo",
                    "peg" => "Pegasus",
                    "per" => "Perseus",
                    "phe" => "Phoenix",
                    "pic" => "Pictor",
                    "psc" => "Pisces",
                    "psa" => "Piscis Austrinus",
                    "pup" => "Puppis",
                    "pyx" => "Pyxis",
                    "ret" => "Reticulum",
                    "sge" => "Sagitta",
                    "sgr" => "Sagittarius",
                    "sco" => "Scorpius",
                    "scl" => "Sculptor",
                    "sct" => "Scutum",
                    "ser" => "Serpens",
                    "sex" => "Sextans",
                    "tau" => "Taurus",
                    "tel" => "Telescopium",
                    "tri" => "Triangulum",
                    "tra" => "Triangulum Australe",
                    "tuc" => "Tucana",
                    "uma" => "Ursa Major",
                    "umi" => "Ursa Minor",
                    "vel" => "Vela",
                    "vir" => "Virgo",
                    "vol" => "Volans",
                    "vul" => "Vulpecula"
                );
                $table = new V1_Model_DbTable_NGC();
                while (($buffer = fgets($handle, 4096)) !== false && $i++ < 100) {
                    try{
                        $temp = explode(',', preg_replace("/\s+/", " ", str_replace('"', '', $buffer)));
                        $item = array(
                            // 'names' => array(trim($temp[0]), trim($temp[1])),
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
                        );
                        // performace very slow, need to improve
                        $table->insert($item);
                    }
                    catch(Exception $e){
                        // die silently
                        $this->info['error'] = array('message' => 'Failed to insert row '.$i, 'exception' => $e);
                    }
                }
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
        $object = new V1_Model_DbTable_NGC();
        $body['results'] = $object->fetchAll($object->select()->limit($limit, $offset))->toArray();
        $body['info'] = $this->info;

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


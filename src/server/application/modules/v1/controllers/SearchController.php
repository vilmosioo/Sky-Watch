<?php

class V1_SearchController extends Zend_Controller_Action
{

	public function init(){
    	$this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);
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
        @$search = !empty($q) ? $q : null;
        
        $body = array('title' => "Search results for : " . $search);
        
        if(empty($search)){
            $body['error'] = 'Please provide a query string by adding ?q=YOUR_QUERY to the url.';
        } else {
            $results = array();

            // sanitize search query
            $search = strtolower($search);

            // check to see if we ask for a specific catalogue
            if(preg_match("/sao \d+/", $search)){
                $stars = new V1_Model_DbTable_SmithsonianAstrophysicalObservatory();
                $search = trim(str_replace("sao", "", $search));
                $search = '%'.$search.'%';

                $results = $stars->fetchAll(
                    $stars->select()
                        ->where('SAO LIKE ?', $search)
                        ->order('SAO ASC')
                        ->limit(100) 
                )->toArray();
            } else if(preg_match("/hip \d+/", $search)){
                $stars = new V1_Model_DbTable_Hipparcos();
                $search = trim(str_replace("hip", "", $search));
                $search = '%'.$search.'%';

                $results = $stars->fetchAll(
                    $stars->select()
                        ->where('HIP LIKE ?', $search)
                        ->order('HIP ASC')
                        ->limit(100) 
                )->toArray();
            } else if(preg_match("/bsc \d+/", $search)){
                $stars = new V1_Model_DbTable_BrightStarCatalogue();
                $search = trim(str_replace("bsc", "", $search));
                $search = '%'.$search.'%';

                $results = $stars->fetchAll(
                    $stars->select()
                        ->where('HR LIKE ?', $search)
                        ->order('HR ASC')
                        ->limit(100) 
                )->toArray();
            } else {
                $names = new V1_Model_DbTable_Name();
                
                $greek_letters = array("alpha" => "alp", "beta" => "bet", "gamma" => "gam", "delta" => "del", "epsilon" => "eps", "zeta" => "zet", "theta" => "the", "iota" => "iot", "kappa" => "kap", "lambda" => "lam", "omicron" => "omi", "sigma" => "sig", "tau" => "tao", "upsilon" => "ups", "omega" => "ome");
                foreach ($greek_letters as $key => $value) {
                    $search = str_replace(strtolower($key), $value, $search);
                }

                $constellations = array("Andromeda" => "and", "Antlia" => "ant", "Apus" => "aps", "Aquarius" => "aqr", "Aquila" => "aql", "Ara" => "ara", "Aries" => "ari", "Auriga" => "aur", "Boötes" => "boo", "Caelum" => "cae", "Camelopardalis" => "cam", "Cancer" => "cnc", "Canes Venatici" => "cvn", "Canis Major" => "cma", "Canis Minor" => "cmi", "Capricornus" => "cap", "Carina" => "car", "Cassiopeia" => "cas", "Centaurus" => "cen", "Cepheus" => "cep", "Cetus" => "cet", "Chamaeleon" => "cha", "Circinus" => "cir", "Columba" => "col", "Coma Berenices" => "com", "Corona Austrina" => "cra", "Corona Borealis" => "crb", "Corvus" => "crv", "Crater" => "crt", "Crux" => "cru", "Cygnus" => "cyg", "Delphinus" => "del", "Dorado" => "dor", "Draco" => "dra", "Equuleus" => "equ", "Eridanus" => "eri", "Fornax" => "for", "Gemini" => "gem", "Grus" => "gru", "Hercules" => "her", "Horologium" => "hor", "Hydra" => "hya", "Hydrus" => "hyi", "Indus" => "ind", "Lacerta" => "lac", "Leo" => "leo", "Leo Minor" => "lmi", "Lepus" => "lep", "Libra" => "lib", "Lupus" => "lup", "Lynx" => "lyn", "Lyra" => "lyr", "Mensa" => "men", "Microscopium" => "mic", "Monoceros" => "mon", "Musca" => "mus", "Norma" => "nor", "Octans" => "oct", "Ophiuchus" => "oph", "Orion" => "ori", "Pavo" => "pav", "Pegasus" => "peg", "Perseus" => "per", "Phoenix" => "phe", "Pictor" => "pic", "Pisces" => "psc", "Piscis Austrinus" => "psa", "Puppis" => "pup", "Pyxis" => "pyx", "Reticulum" => "ret", "Sagitta" => "sge", "Sagittarius" => "sgr", "Scorpius" => "sco", "Sculptor" => "scl", "Scutum" => "sct", "Serpens" => "ser", "Sextans" => "sex", "Taurus" => "tau", "Telescopium" => "tel", "Triangulum" => "tri", "Triangulum Australe" => "tra", "Tucana" => "tuc", "Ursa Major" => "uma", "Ursa Minor" => "umi", "Vela" => "vel", "Virgo" => "vir", "Volans" => "vol", "vulpecula" => "vul");
                foreach ($constellations as $key => $value) {
                    $search = str_replace(strtolower($key), $value, $search);
                }
                
                $search = str_replace(" ", "%", $search);
                $search = '%'.$search.'%';

                // get name query result
                $results = $names->fetchAll(
                    $names->select()
                        ->where('name LIKE ?', $search)
                        ->order('name ASC')
                        ->limit(100, 0) // count, offset
                );
                if(count($results) == 0){
                	$results = array('Your query returned 0 results.');
                } else {
                    $stars = new V1_Model_DbTable_Star();
                    $ngc = new V1_Model_DbTable_NGC();
                    $planets = new V1_Model_DbTable_Planet();
                    foreach ($results as $result) {
                        $sourceid = $result->sourceid;
                        if($result->source == 'Star'){
                            $result->sourceid = $stars->find($sourceid)->current()->normalize();
                        } else if($result->source == 'NewGeneralCatalogueandIndexCatalogue'){
                            $result->sourceid = $ngc->find($sourceid)->current()->toArray();
                        } else if($result->source == 'Planet'){
                            $result->sourceid = $planets->find($sourceid)->current()->toArray();
                        }
                        $temp = $names->fetchAll(
                            $names->select()
                                ->where('source = ?', $result->source)
                                ->where('sourceid = ?', $sourceid)
                        );
                        $all_names = array();
                        foreach ($temp as $value) {
                            $all_names[] = $value->name;
                        }
                        $result->name = $all_names;
                    }
                }
                $body['results'] = $results->toArray();
            }
        }

        $this->getResponse()->setBody(!empty($callback) ? "{$callback}(" . json_encode($body) . ")" : json_encode($body));
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction()
    {
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


<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    protected function _initError(){
        $front = Zend_Controller_Front::getInstance();
        $front->registerPlugin(new Zend_Controller_Plugin_ErrorHandler(array(
            'module'     => 'v1',
            'controller' => 'error',
            'action'     => 'index'
        )));
    }

    protected function _initData(){
        Zend_Registry::set('types' , array(
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
        ));
        Zend_Registry::set('constellations' , array(
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
        ));
        Zend_Registry::set('names', array(
            "NGC 104" => "47 TUCANAE" ,
            "NGC 224" => "ANDROMEDA GALAXY" ,
            "NGC 4038" => "ANTENNAE" ,
            "NGC 4039" => "ANTENNAE" ,
            "NGC 650" => "BARBELL NEBULA" ,
            "NGC 6822" => "BARNARD'S GALAXY" ,
            "NGC 276" => "BARNARD'S LOOP" ,
            "NGC 2537" => "BEAR PAW GALAXY" ,
            "NGC 2632" => "BEEHIVE CLUSTER (PRAESEPE)" ,
            "NGC 4826" => "BLACKEYE NEBULA" ,
            "NGC 6826" => "BLINKING PLANETARY" ,
            "NGC 6905" => "BLUE FLASH" ,
            "NGC 7088" => "BAXENDELL'S UNPHOTOGRAPHABLE NEBULA" ,
            "Cr 399" => "BROCCHI'S CLUSTER" ,
            "NGC 7635" => "BUBBLE NEBULA" ,
            "NGC 6302" => "BUG NEBULA" ,
            "NGC 1499" => "CALIFORNIA NEBULA" ,
            "NGC 6543" => "CAT'S EYE" ,
            "NGC 155" => "CAVE NEBULA" ,
            "NGC 3242" => "CBS EYE" ,
            "NGC 2264" => "CHRISTMAS TREE CLUSTER" ,
            "NGC 2392" => "CLOWN FACE NEBULA" ,
            "Cr 399" => "COATHANGER" ,
            "IC 5146" => "COCOON NEBULA" ,
            "IC 2574" => "CODDINGTON'S GALAXY" ,
            "NGC 2264" => "CONE NEBULA" ,
            "NGC 1952" => "CRAB NEBULA" ,
            "NGC 6445" => "CRESCENT" ,
            "NGC 6888" => "CRESCENT" ,
            "NGC 6853" => "DUMBBELL NEBULA" ,
            "NGC 6611" => "EAGLE NEBULA" ,
            "NGC 3132" => "EIGHT-BURST" ,
            "NGC 2392" => "ESKIMO PLANETARY" ,
            "NGC 3372" => "ETA CARINA NEBULA" ,
            "B 144" => "FISH ON A PLATTER" ,
            "IC 405" => "FLAMING STAR NEBULA" ,
            "NGC 3242" => "GHOST OF JUPITER" ,
            "NGC 869" => "H PERSEI" ,
            "NGC 7293" => "HELIX NEBULA" ,
            "NGC 6205" => "HERCULES CLUSTER" ,
            "NGC 1555" => "HIND'S VARIABLE NEBULA" ,
            "IC 434" => "HORSEHEAD NEBULA" ,
            "NGC 2261" => "HUBBLE'S VARIABLE NEBULA" ,
            "Mel 25" => "HYADES" ,
            "B 86" => "INKSPOT" ,
            "UGC 3697" => "INTEGRAL SIGN GALAXY" ,
            "NGC 4755" => "JEWEL BOX" ,
            "NGC 3372" => "KEYHOLE NEBULA" ,
            "NGC 6523" => "LAGOON NEBULA" ,
            "NGC 650" => "LITTLE DUMBBELL NEBULA" ,
            "NGC 6818" => "LITTLE GEM" ,
            "NGC 6369" => "LITTLE GHOST" ,
            "Sh2-261" => "LOWER'S NEBULA" ,
            "ABELL 21" => "MEDUSA NEBULA" ,
            "NGC 7000" => "NORTH AMERICAN NEBULA" ,
            "NGC 6618" => "OMEGA NEBULA" ,
            "NGC 5139" => "OMEGA CEN CLUSTER" ,
            "NGC 1976" => "ORION NEBULA" ,
            "NGC 3587" => "OWL NEBULA" ,
            "B 87" => "PARROT'S HEAD" ,
            "IC 5067" => "PELICAN NEBULA" ,
            "NGC 6741" => "PHANTOM STREAK" ,
            "NGC 598" => "PINWHEEL GAL" ,
            "NGC 1267" => "PIPE NEB" ,
            "Mel 22" => "PLEIADES" ,
            "NGC 2573" => "POLARISSIMA AUSTRALIS" ,
            "NGC 3172" => "POLARISSIMA BOREALIS" ,
            "NGC 6720" => "RING NEB" ,
            "NGC 4038" => "RINGTAIL GAL" ,
            "NGC 2244" => "ROSETTE" ,
            "IC 2944" => "RUNNING CHICKEN NEBULA" ,
            "NGC 7009" => "SATURN NEB" ,
            "NGC 4567" => "SIAMESE TWINS" ,
            "NGC 4568" => "SIAMESE TWINS" ,
            "NGC 4594" => "SOMBRERO GAL" ,
            "NGC 3115" => "SPINDLE NEB" ,
            "NGC 1554" => "STRUVE'S LOST NEBULA" ,
            "NGC 5055" => "SUNFLOWER GAL" ,
            "NGC 6231" => "TABLE OF SCORPIUS" ,
            "NGC 2024" => "TANK TRACK NEBULA" ,
            "IC 2220" => "TOBY JUG NEBULA" ,
            "NGC 6451" => "TOM THUMB CLUSTER" ,
            "NGC 6514" => "TRIFID" ,
            "Cr 140" => "TUFT IN THE TAIL OF THE DOG" ,
            "NGC 6960" => "VEIL NEB" ,
            "NGC 6992" => "VEIL NEB" ,
            "NGC 5194" => "WHIRLPOOL GAL" ,
            "IC 2118" => "WITCH-HEAD NEB" ,
            "IC 4593" => "WHITE EYED PEA" ,
            "NGC 884" => "X PER"
        ));
    }

	protected function _initDbAdapter() {
        $this->bootstrap('db');
        $db = $this->getResource('db');
        Zend_Registry::set('db' , $db);
    }

    protected function _initAutoloaderSetup(){
        $autoloader = new Zend_Application_Module_Autoloader(array(
                'namespace' => 'V1_',
                'basePath'  => dirname(__FILE__) . '/modules/v1',
        ));
    }

    protected function _initView()
    {
        // Initialize view
        $view = new Zend_View();
        
        // Add it to the ViewRenderer
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'ViewRenderer'
        );
        $viewRenderer->setView($view);
 
        // Return it, so that it can be stored by the bootstrap
        return $view;
    }

    protected function _initMisc(){
        date_default_timezone_set('UTC');
        Zend_Date::setOptions(array('format_type' => 'php'));
        ini_set("auto_detect_line_endings", true);
    }

}


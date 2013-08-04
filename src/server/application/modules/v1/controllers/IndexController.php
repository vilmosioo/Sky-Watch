<?php

class V1_IndexController extends Zend_Controller_Action
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
        $limit = !empty($limit) && is_numeric($limit) && $limit < 50 ? $limit : 50;
        $offset = !empty($offset) && is_numeric($offset) ? $offset : 0;
        $orderby = !empty($orderby) && in_array($orderby, array('magnitude', 'RA', 'DE')) ? $orderby : 'magnitude';
        $desc = !empty($desc) && in_array($desc, array('DESC', 'ASC')) ? $desc : 'ASC';
        $body = array();

        $ngc_table = new V1_Model_DbTable_NGC();
        $names_table = new V1_Model_DbTable_Names();
        
        $results = $ngc_table->fetchAll($ngc_table->select()->order($orderby)->limit($limit, $offset))->toArray();
        foreach ($results as $key => $value) {
            $results[$key]['names'] = array();
            $names = $names_table->fetchAll($names_table->select()->where('ngc = ?', $value['id']))->toArray();
            foreach ($names as $key1 => $value1) {
                array_push($results[$key]['names'], $value1['name']);
            }
        }
        $body['results'] = $results;
        
        $planet_table = new V1_Model_DbTable_Planet();
        $ephemerid_table = new V1_Model_DbTable_Ephemerid();

        $results = $planet_table->fetchAll($planet_table->select())->toArray();
        foreach ($results as $key => $value) {
            // current julian date, including fractions
            $now = gregoriantojd(date('m'), date('d'), date('Y')) - 0.5 + date('H') / 24 + date('i') / 60 / 24 + date('s') / 3600 / 24;

            // perform a union of ephemerids: 3 larger and 3 smaller
            $select1 = $ephemerid_table->select()->where("planet = '$value[id]' AND JD >= '$now'")->limit(3);
            $select2 = $ephemerid_table->select()->where("planet = '$value[id]' AND JD < '$now'")->order('JD DESC')->limit(3);
            $query = $ephemerid_table->select()->union(array("($select1)", "($select2)"), Zend_Db_Select::SQL_UNION_ALL)->order('JD DESC');
            $ephemerids = $ephemerid_table->fetchAll($query)->toArray();
            
            // add ephemerids to item
            $results[$key]['ephemerids'] = $ephemerids;

            // calculate mean magnitude (might not be necessary)
            $magnitude = 99;
            if(!empty($ephemerids)){
                $magnitude = 0;
                foreach ($ephemerids as $key1 => $value1) {
                    $magnitude += floatval($value1['magnitude']);
                }
                $magnitude /= count($ephemerids);
            }
            $results[$key]['magnitude'] = $magnitude;
        }
        $body['results'] = array_merge($body['results'], $results);

        usort($body['results'], array(&$this, "cmp"));
        
        $this->getResponse()->setBody(!empty($callback) ? "{$callback}(" . json_encode($body) . ")" : json_encode($body));
        $this->getResponse()->setHttpResponseCode(200);
    }

    // combine the results
    public function cmp($a, $b)
    {
        if ($a == $b) {
            return 0;
        }
        return (floatval($a['magnitude']) < floatval($b['magnitude'])) ? -1 : 1;
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


<?php

class V1_BrowseController extends Zend_Controller_Action
{

	public function init(){
    	$this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);
        $this->getResponse()->setHeader('access-control-allow-origin', '*', true);
        $this->getResponse()->setHeader('Cache-Control', 'max-age='.(6*24*3600).', public', true); // cache for 6 hours 
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
        
        // initialise response body
        $body = array(
            'limit' => $limit,
            'total' => 1000
        );

        $cache = Zend_Registry::get('cache');
        $ngc_table = new V1_Model_DbTable_NGC();

        if(!$results = $cache->load('ngc_random_' . $limit)) {
            $ngc = $ngc_table->fetchAll($ngc_table->select()->order('magnitude')->limit(1000));
            $results = array();
            foreach ($ngc as $key => $value) {
                array_push($results, $value->normalize());
            }
            
            $cache->save($results, 'ngc_random_' . $limit);
        }

        $body['results'] = $results;
        
        // current julian date
        $now = gregoriantojd(date('m'), date('d'), date('Y')) - 0.5;
        $now_str = str_replace('.', '_', $now);

        $results = array();
        if(!$results = $cache->load('planet_' . $now_str)) {
            $planet_table = new V1_Model_DbTable_Planet();
                
            $planets = $planet_table->fetchAll($planet_table->select());
            $results = array();
            foreach ($planets as $key => $value) {
                array_push($results, $value->normalize());
            }
            
            $cache->save($results, 'planet_' . $now_str);
        }

        $body['results'] = array_merge($body['results'], $results);

        // sort NGC+planets array
        shuffle($body['results']);
        
        // return limit+offset array
        $body['results'] = array_splice($body['results'], 0, $limit);

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


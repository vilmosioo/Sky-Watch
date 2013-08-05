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
            $search = str_replace(" ", "%", $search);
            $search = '%'.trim(strtolower($search)).'%';

            $names = new V1_Model_DbTable_Names();
            $ngc = new V1_Model_DbTable_NGC();
            $planets = new V1_Model_DbTable_Planet();
                
            $results = $names->fetchAll(
                $names->select()
                    ->where('LOWER(name) LIKE ?', $search)
                    ->order('name ASC')
                    ->limit(50, 0) // count, offset
            );

            $results2 = $planets->fetchAll(
                $query = $planets->select()
                    ->where('LOWER(name) LIKE ?', $search)
                    ->order('name ASC')
                    ->limit(50, 0)
            );
            
            $items = array();
            
            if(count($results) == 0 && count($results2) == 0){
            	$body['results'] = array('Your query returned 0 results.');
            } else {
                if(count($results) > 0){
                    foreach ($results as $result) {
                        array_push($items, $ngc->find($result->ngc)->current()->normalize());
                    }
                }

                if(count($results2) > 0){
                    foreach ($results2 as $result) {
                        array_push($items, $result->normalize());
                    }
                }
            }
            $body['results'] = $items;
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


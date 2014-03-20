<?php

class V1_SearchController extends Zend_Controller_Action
{

	public function init(){
    	$this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
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
        @$search = !empty($q) ? $q : null;
        $limit = !empty($limit) && is_numeric($limit) && $limit < 50 ? $limit : 50;
        $offset = !empty($offset) && is_numeric($offset) ? $offset : 0;

        $body = array(
            'title' => "Search results for : $search",
            'limit' => $limit,
            'offset' => $offset
        );

        $cache = Zend_Registry::get('cache');
        $search_results = array();

        if(empty($search)){
            $body['error'] = 'Please provide a query string by adding ?q=YOUR_QUERY to the url.';
        } else {
            
            if(!$search_results = $cache->load('search_' . $q . '_' . $offset . '_' . $limit)) {
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
                    $search_results = array('Your query returned 0 results.');
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
                $search_results = $items;
                $cache->save($search_results, 'search_' . $q . '_' . $offset . '_' . $limit);
            }
        }

        // return limit+offset array
        $body['total'] = count($search_results);
        $body['results'] = array_splice($search_results, $offset, $limit);

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


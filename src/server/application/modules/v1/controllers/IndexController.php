<?php

class V1_IndexController extends Zend_Controller_Action
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
        $offset = !empty($offset) && is_numeric($offset) ? $offset : 0;
        $orderby = !empty($orderby) && in_array($orderby, array('magnitude', 'RA', 'DE')) ? $orderby : 'magnitude';
        $desc = !empty($desc) && in_array($desc, array('DESC', 'ASC')) ? $desc : 'ASC';
        
        // orderby is the term and order is the SQL columns
        $order = $orderby;
        $order == 'RA' && $order = array('RAh', 'RAm');
        $order == 'DE' && $order = array('DEd', 'DEm');
        $this->_orderby = $order;
        
        // initialise response body
        $body = array(
            'limit' => $limit,
            'offset' => $offset,
            'orderby' => $orderby,
            'desc' => $desc
        );

        $cache = Zend_Registry::get('cache');
        $ngc_table = new V1_Model_DbTable_NGC();
        $names_table = new V1_Model_DbTable_Names();
        
        $results = array();
        if(!$results = $cache->load('ngc_' . $orderby . '_' . $limit . '_' . $offset)) {
            $results = $ngc_table->fetchAll($ngc_table->select()->order($order)->limit($limit + $offset, 0))->toArray();
            foreach ($results as $key => $value) {
                $results[$key]['names'] = array();
                $names = $names_table->fetchAll($names_table->select()->where('ngc = ?', $value['id']))->toArray();
                foreach ($names as $key1 => $value1) {
                    array_push($results[$key]['names'], $value1['name']);
                }
            }
            
            $cache->save($results, 'ngc_' . $orderby . '_' . $limit . '_' . $offset);
        }

        $body['results'] = $results;
        
        // current julian date
        $now = gregoriantojd(date('m'), date('d'), date('Y')) - 0.5;
        $now_str = str_replace('.', '_', $now);

        $results = array();
        if(!$results = $cache->load('planet_' . $now_str)) {
            $planet_table = new V1_Model_DbTable_Planet();
            $ephemerid_table = new V1_Model_DbTable_Ephemerid();
                
            $results = $planet_table->fetchAll($planet_table->select())->toArray();
            foreach ($results as $key => $value) {
                // perform a union of ephemerids: 12 larger and 12 smaller, this ensures the most relevant ephemeris is present in the array
                $select1 = $ephemerid_table->select()->where("planet = '$value[id]' AND JD >= '$now'")->limit(12);
                $select2 = $ephemerid_table->select()->where("planet = '$value[id]' AND JD < '$now'")->order('JD DESC')->limit(12);
                $query = $ephemerid_table->select()->union(array("($select1)", "($select2)"), Zend_Db_Select::SQL_UNION_ALL)->order('JD DESC');
                $ephemerids = $ephemerid_table->fetchAll($query)->toArray();
                
                // add ephemerids to item
                $results[$key]['ephemerids'] = $ephemerids;

                // calculate mean fields (might not be necessary)
                $fields = array(
                    'magnitude' => 99,
                    'RAh' => 0,
                    'RAm' => 0,
                    'DEd' => 0,
                    'DEm' => 0
                );
                if(!empty($ephemerids)){
                    $fields['magnitude'] = 0;
                    foreach ($ephemerids as $key1 => $value1) {
                        foreach ($fields as $field_key => $field_value) {
                           $fields[$field_key] += floatval($value1[$field_key]); 
                        }
                    }
                    
                }
                foreach ($fields as $field_key => $field_value) {
                   $results[$key][$field_key] = $fields[$field_key] / count($ephemerids); 
                }
            }
            
            $cache->save($results, 'planet_' . $now_str);
        }

        $body['results'] = array_merge($body['results'], $results);

        // sort NGC+planets array
        usort($body['results'], array(&$this, "cmp"));
        
        // return limit+offset array
        $body['results'] = array_splice($body['results'], $offset, $limit);

        $this->getResponse()->setBody(!empty($callback) ? "{$callback}(" . json_encode($body) . ")" : json_encode($body));
        $this->getResponse()->setHttpResponseCode(200);
    }

    protected $_orderby = 'magnitude';

    // comparison function
    public function cmp($a, $b)
    {
        if ($a == $b) {
            return 0;
        }
        if(is_array($this->_orderby)){
            // compare each term one after the other
            foreach ($this->_orderby as $key => $value) {
                if(floatval($a[$value]) != floatval($b[$value])){
                    return (floatval($a[$value]) < floatval($b[$value])) ? -1 : 1;   
                }
            }
            // all terms equal
            return 0;
        } else {
            return (floatval($a[$this->_orderby]) < floatval($b[$this->_orderby])) ? -1 : 1;
        }
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


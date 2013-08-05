<?php
class V1_Model_DbRow_NGC extends Zend_Db_Table_Row_Abstract
{
    public function normalize(){
		$item = $this->toArray();
		$item['names'] = array();
		
		$names_table = new V1_Model_DbTable_Names();

    	$names = $names_table->fetchAll($names_table->select()->where('ngc = ?', $item['id']))->toArray();
        foreach ($names as $key => $value) {
        	array_push($item['names'], $value['name']);
        }
    	
    	unset($item['id']);
		return $item;
    }
}
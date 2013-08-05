<?php
class V1_Model_DbRow_Planet extends Zend_Db_Table_Row_Abstract
{
    public function normalize(){
    	$ephemerid_table = new V1_Model_DbTable_Ephemerid();
		$now = gregoriantojd(date('m'), date('d'), date('Y')) - 0.5 + date('H') / 24 + date('i') / 60 / 24 + date('s') / 3600 / 24;

		// perform a union of ephemerids: 3 larger and 3 smaller
		$select1 = $ephemerid_table->select()->where("planet = '".$this->id."' AND JD >= '$now'")->limit(3);
		$select2 = $ephemerid_table->select()->where("planet = '".$this->id."' AND JD < '$now'")->order('JD DESC')->limit(3);
		$query = $ephemerid_table->select()->union(array("($select1)", "($select2)"), Zend_Db_Select::SQL_UNION_ALL)->order('JD DESC');
		$ephemerids = $ephemerid_table->fetchAll($query)->toArray();

		// add ephemerids to item
		$item = $this->toArray();
		$item['ephemerids'] = $ephemerids;
		unset($item['id']);
        return $item;
    }
}
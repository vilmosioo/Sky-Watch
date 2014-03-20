<?php
class V1_Model_DbRow_Planet extends Zend_Db_Table_Row_Abstract
{
    public function normalize(){
    	$ephemerid_table = new V1_Model_DbTable_Ephemerid();
			$now = gregoriantojd(date('m'), date('d'), date('Y')) - 0.5 + date('H') / 24 + date('i') / 60 / 24 + date('s') / 3600 / 24;

			// perform a union of ephemerids: 12 larger and 12 smaller, this ensures the most relevant ephemeris is present in the array
			$select1 = $ephemerid_table->select()->where("planet = '".$this->id."' AND JD >= '$now'")->limit(12);
			$select2 = $ephemerid_table->select()->where("planet = '".$this->id."' AND JD < '$now'")->order('JD DESC')->limit(12);
			$query = $ephemerid_table->select()->union(array("($select1)", "($select2)"), Zend_Db_Select::SQL_UNION_ALL)->order('JD DESC');
			$ephemerids = $ephemerid_table->fetchAll($query)->toArray();

			foreach ($ephemerids as $key => $value) {
				unset($ephemerids[$key]['id']);
				unset($ephemerids[$key]['planet']);
			}
			// add ephemerids to item
			$item = $this->toArray();

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
         $item[$field_key] = $fields[$field_key] / count($ephemerids); 
      }

			$item['ephemerids'] = $ephemerids;
			unset($item['id']);
      return $item;
    }
}
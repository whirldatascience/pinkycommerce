<?php
class Product_model extends CI_Model {
	public function getProduct($productName) {
		$this->load->database ();
		$this->db->select ( "*" );
		$this->db->from ( "productMaster" );
		$this->db->like ( "productName", $productName );
		$query = $this->db->get ();
		return $query->result ();
	}
}
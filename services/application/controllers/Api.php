<?php
defined ( 'BASEPATH' ) or exit ( 'No direct script access allowed' );
class API extends CI_Controller {
	public function index() {
		echo 'This is the API call of Pinky Commerce';
	}
	public function productDetails($productName) {
		$productName = urldecode ( $productName );
		$this->load->model ( 'product_model' );
		$productResult = ($this->product_model->getProduct ( $productName ));
		echo "This is the result of " . $productResult [0]->productName . "." . $productResult [0]->productDescription . ". you can buy it for, rupees " . $productResult [0]->price . '';
	}
}
<?php 
session_start();
include ('config/database.php');
$formula ='';

if (isset($_SESSION['employee_id'])) {
		
	if (isset($_POST['formula'])) {
		$formula = $_POST['formula'];
	}
	switch ($formula) {


        case 'products_':
			$result = $database->query_run("SELECT
												pm.`code`,
												pm.description,
												(SELECT account_title FROM main_account WHERE pm.je_output = mainaccount_no)je_output,
												(SELECT account_title FROM main_account WHERE pm.je_vat = mainaccount_no)je_vat,
												(SELECT account_title FROM main_account WHERE pm.je_vat_exempt = mainaccount_no)je_vat_excempt
											FROM
												cloud_2020.`product_masterlist` pm");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		
		case 'account_title_':
            $result = $database->query_run("SELECT * FROM `main_account`");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;
		

        case 'update_':
			$x = $_POST['x_'];
			$update = $database->query_run("UPDATE cloud_2020.`product_masterlist` SET $x = '".$_POST['value_']."' WHERE code = '".$_POST['id_']."'");
			echo ($update == 1 ? 'success' : $update);
			
		break;




		default:
			break;
	}

}
else
{
	echo "session-expired";
}



 ?>
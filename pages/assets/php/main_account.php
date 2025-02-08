<?php 
session_start();
include ('config/database.php');
$formula ='';

if (isset($_SESSION['employee_id'])) {
		
	if (isset($_POST['formula'])) {
		$formula = $_POST['formula'];
		$employee_id = $_SESSION['employee_id'];
	}
	switch ($formula) {

		case 'add_':
			$report_data = $_POST['report_data_'];
            $report_string = implode(",", $report_data);

			$insert = "INSERT INTO `main_account` (`account_no`,`category_code`,`subcategory_code`,`account_title`,`balance`,`report`,`added_by`) 
								VALUES (?,?,?,?,?,?,?)";
	
			$params = [$_POST['toa_list_'],
						$_POST['category_list_'],
						$_POST['subcategory_id_'],
						$_POST['acct_title_'],
						$_POST['balance_data_'],
						$report_string,
						$employee_id];
			$check = $database->prepareAndExecute($insert, $params, false);
			
			echo $check == true ? 'success' : $check;
		break;

		
		case 'load_':
            $a = $_POST['acctTitle_'] == 'All' ? 'WHERE 1'  : "WHERE mainaccount_no = '".$_POST['acctTitle_']."'";

			$result = $database->query_run("SELECT * FROM `main_account` $a;");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

        case 'toa_':
			$result = $database->query_run("SELECT * FROM `toa`;");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

        case 'category_':
			$result = $database->query_run("SELECT * FROM `category` WHERE account_no = '".$_POST['c_']."';");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'subcategory_':
            $result = $database->query_run("SELECT * FROM `subcategory` WHERE category_code = '".$_POST['c_']."';");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'main_account_':
            $result = $database->query_run("SELECT * FROM `main_account` ORDER BY id DESC");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

        case 'status_':
			$update = $database->query_run("UPDATE `subcategory` SET `status`='".$_POST['status_']."' WHERE id = '".$_POST['id_']."'");
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
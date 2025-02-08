<?php 
	session_start();
	include ('config/database.php');
	$formula ='';

	if (isset($_SESSION['employee_id'])) {
			
		if (isset($_POST['formula'])) {
			$formula = $_POST['formula'];
		}
		switch ($formula) {

			case 'add_':
				$insert = $database->query_run("INSERT INTO `category` (`category`,`account_no`,`toa`,`added_by`) 
														VALUES ('".$_POST['ctgry_']."',
																'".$_POST['select_toa_']."',
																'".$_POST['type_account_']."',
																'".$_SESSION['employee_id']."')");
				echo ($insert == 1 ? 'success' : $insert);

				
			break;

			case 'load_':
				$a = $_POST['ctgry_'] == 'All' ? 'WHERE 1'  : "WHERE category_code = '".$_POST['ctgry_']."'";

				$result = $database->query_run("SELECT * FROM `category` $a;");
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
				$result = $database->query_run("SELECT * FROM `category`;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'status_':
				$update = $database->query_run("UPDATE `category` SET `status`='".$_POST['status_']."' WHERE id = '".$_POST['id_']."'");
				echo ($update == 1 ? 'success' : $update);
				
			break;




			default:
				break;
		}

	}
	else{
		echo "session-expired";
	}
 ?>
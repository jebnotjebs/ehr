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
			$insert = $database->query_run("INSERT INTO `subcategory` (`account_no`,`category_code`,`subcategory`,`added_by`) 
                                                    VALUES ('".$_POST['toa_list_']."',
                                                            '".$_POST['category_list_']."',
                                                            '".$_POST['subcategory_id_']."',
                                                            '".$_SESSION['employee_id']."')");
            echo ($insert == 1 ? 'success' : $insert);

			
		break;

		case 'load_':
            $a = $_POST['subcategory_data_'] == 'All' ? 'WHERE 1'  : "WHERE subcategory_code = '".$_POST['subcategory_data_']."'";

			$result = $database->query_run("SELECT * FROM `subcategory` $a;");
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
			$result = $database->query_run("SELECT * FROM `subcategory`;");
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
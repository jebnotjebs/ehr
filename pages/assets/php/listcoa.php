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
            $report_data = $_POST['report_data_'];

            // Implode the array into a comma-separated string
            $report_string = implode(",", $report_data);
			$insert = $database->query_run("INSERT INTO `main_account` (`account_no`,`category_code`,`subcategory_code`,`account_title`,`balance`,`report`,`added_by`) 
                                                    VALUES ('".$_POST['toa_list_']."',
                                                            '".$_POST['category_list_']."',
                                                            '".$_POST['subcategory_id_']."',
                                                            '".$_POST['acct_title_']."',
                                                            '".$_POST['balance_data_']."',
                                                            '$report_string',
                                                            '".$_SESSION['employee_id']."')");
            echo ($insert == 1 ? 'success' : $insert);
		break;

		case 'load_':

			$result = $database->query_run("SELECT * FROM `main_account` WHERE dt_added BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' ORDER BY id DESC");
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

        case 'listcoaxxx_':
            $result = $database->query_run("SELECT 
                                                mainaccount_no,
                                                account_title,
                                                IFNULL((SELECT ROUND(SUM(debit),2) FROM acct_journal_entry je WHERE je.account_code = m.mainaccount_no AND account_code <> ''),0) tdebit,
                                                IFNULL((SELECT ROUND(SUM(credit),2) FROM acct_journal_entry je WHERE je.account_code = m.mainaccount_no AND account_code <> ''),0) tcredit
                                            FROM main_account m
                                                ORDER BY account_title ASC");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'listcoa_':
            $result = $database->query_run("SELECT * FROM `main_account` ORDER BY id DESC");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;


        case 'branches_':
            $result = $database->query_run("SELECT * FROM `branches` WHERE `code` NOT IN('TST01','WCRD0') ORDER BY `name` ASC");
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
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

			case 'save_journal_':
				// Get the JSON data sent from the client
				$journalDataJson = $_POST['journalData'];
				$date_t = $_POST['date_trans_'];
				$branch_data = $_POST['branch_data_'];
				$memo = $_POST['memo_'];
				// Decode JSON data
				$journalData = json_decode($journalDataJson, true);

				$code = $database->query_run("SELECT CONCAT(prefix, lpad(last_value + 1, `length`, '0'), suffix) as nextcode FROM code_settings WHERE `type`= 'journal_transaction_no'");
				$c = mysqli_fetch_object($code);

				// insert each journal entry in the database
				foreach ($journalData as $entry) {
					// Example SQL query to update data in a hypothetical journal table
					$database->query_run("INSERT INTO add_journal 
																(mainaccount_no, 
																debit, 
																credit,
																location,
																added_by,
																date_transaction,
																transaction_no,
																memo,
																journal_type)
														VALUES ('{$entry['account_title']}',
																'{$entry['debit']}',
																'{$entry['credit']}',
																'$branch_data',
																'$employee_id',
																'$date_t',
																'$c->nextcode',
																'$memo',
																'MANUAL');");
				}

				$update = $database->query_run("UPDATE code_settings SET last_value = last_value + 1 WHERE `type` = 'journal_transaction_no';");
			
				echo $update == 1 ? 'success' : $update;

			break;

			case 'main_account_':
				$result = $database->query_run("SELECT * FROM `main_account` ORDER BY mainaccount_no ASC");
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

			case 'journal_':
				$result = $database->query_run("SELECT date_transaction,
													added_by,
													transaction_no,
													memo,
													FORMAT(SUM(debit), 2) AS total_debit,
													FORMAT(SUM(credit), 2) AS total_credit,
													FORMAT(SUM(debit) - SUM(credit), 2)balance
												FROM `add_journal` 
												WHERE DATE(dt_added) = CURDATE() 
												GROUP BY transaction_no 
												ORDER BY id DESC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_desc_':
				$result = $database->query_run("SELECT credit,account_title,memo FROM `add_journal` WHERE transaction_no = '".$_POST['code_']."'  ORDER BY mainaccount_no ASC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_debit_':
				$result = $database->query_run("SELECT FORMAT(debit, 2)debit FROM `add_journal` WHERE transaction_no = '".$_POST['code_']."';");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_credit_':
				$result = $database->query_run("SELECT FORMAT(credit, 2)credit FROM `add_journal` WHERE transaction_no = '".$_POST['code_']."';");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			default:
				break;
		}

	}
	else{
		echo "session-expired";
	}
?>
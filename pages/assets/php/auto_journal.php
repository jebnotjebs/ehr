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
				$journalDataJson = $_POST['journalData'];
				$date_t = $_POST['date_trans_'];
				$branch_data = $_POST['branch_data_'];
				$memo = $_POST['memo_'];
				$trans_code = $_POST['journal_trans_no_'];
				// Decode JSON data
				$journalData = json_decode($journalDataJson, true);

				$success = true;
				// insert each journal entry in the database
				foreach ($journalData as $entry) {
					
					$_debit = str_replace(',', '', $entry['debit_']);
					$_credit = str_replace(',', '', $entry['credit_']);

					$database->query_run("INSERT INTO add_journal 
																(account_title, 
																debit, 
																credit,
																location,
																added_by,
																date_transaction,
																transaction_no,
																memo,
																journal_type)
														VALUES ('{$entry['account_title_']}',
																'$_debit',
																'$_credit',
																'$branch_data',
																'$employee_id',
																'$date_t',
																'$trans_code',
																'$memo',
																'DSR');");
					if (!$database) {
						$success = false;
						break; 
					}
				}
			
				if ($success) {
					
					$update = $database->query_run("UPDATE auto_journal SET `status`='POSTED',`dt_posted` = NOW() WHERE transaction_no = '$trans_code'");
					echo $update == 1 ? 'success' : $update;
				} else {
					echo 'Error occurred while inserting data, Please contact the Developers';
				}

			break;

			case 'auto_journal_':
				$result = $database->query_run("SELECT transaction_no,
														report,
														date,
														(SELECT `name` FROM cloud_2020.branches WHERE aje.branch_code = `code` LIMIT 1)branch,
														remarks,
														IF(type = 'MANUAL',(SELECT CONCAT(ep.first_name,', ',ep.last_name) FROM cloud_profilling.employee_profile ep WHERE ep.employee_id = added_by),type)type,
														remarks,
														FORMAT(SUM(ROUND(debit, 2)), 2) AS total_debit,
														FORMAT(SUM(ROUND(credit, 2)), 2) AS total_credit,
														FORMAT(SUM(ROUND(debit,2)) - SUM(ROUND(credit,2)), 2)balance
													FROM
														auto_journal aje
													WHERE
														date = '".$_POST['date_filter_']."'
													AND status = 'TEMP'
													GROUP BY
														transaction_no,date
													ORDER BY
														id DESC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'adjust_journal_':
				$result = $database->query_run("SELECT account,
														FORMAT(debit, 2)debit,
														FORMAT(credit, 2)credit,
														remarks,
														(SELECT `name` FROM cloud_2020.branches WHERE aje.branch_code = `code` LIMIT 1)branch
												FROM auto_journal aje
												WHERE transaction_no = '".$_POST['journal_id_']."'
												AND date = '".$_POST['journal_date_']."' 
												AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY id DESC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_account_title_':
				$result = $database->query_run("SELECT account 
													FROM auto_journal
												WHERE status = 'TEMP' AND transaction_no = '".$_POST['code_']."'
												AND date = '".$_POST['date_']."' 
												AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY account_code ASC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_debit_':
				$result = $database->query_run("SELECT IF(debit = '0.0000','-',FORMAT(debit, 2))debit 
													FROM auto_journal 
												WHERE status = 'TEMP' AND transaction_no = '".$_POST['code_']."'
												AND date = '".$_POST['date_']."'  
												AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY account_code ASC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'journal_credit_':
				$result = $database->query_run("SELECT IF(credit = '0.0000','-',FORMAT(credit, 2))credit    
													FROM auto_journal 
												WHERE status = 'TEMP' AND transaction_no = '".$_POST['code_']."'
												AND date = '".$_POST['date_']."' 
												AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY account_code ASC;");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'accout_title_':
				$result = $database->query_run("SELECT * FROM `main_account` ORDER BY mainaccount_no ASC");
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
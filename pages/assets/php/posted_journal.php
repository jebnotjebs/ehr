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
				
				$update = $database->query_run("UPDATE cloud_2020.`acct_journal_entry` SET `status`='POSTED',`dt_posted` = NOW() WHERE transaction_no = '$trans_code'");
				echo $update == 1 ? 'success' : $update;
			} else {
				echo 'Error occurred while inserting data, Please contact the Developers';
			}

		break;

		case 'posted_journal_':
            $result = $database->query_run("SELECT
												transaction_no,
												memo,
												date_transaction,
												IF(location = '','-',location)location,
												IF(journal_type = 'MANUAL',(SELECT CONCAT(ep.first_name,', ',ep.last_name) FROM cloud_profilling.employee_profile ep WHERE ep.employee_id = added_by),journal_type)added_by,
												FORMAT(SUM(debit), 2) AS total_debit,
												FORMAT(SUM(credit), 2) AS total_credit
											FROM
												add_journal
											WHERE
												date_transaction = '".$_POST['date_filter_']."'
											GROUP BY
												transaction_no
											ORDER BY
												id DESC");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'adjust_journal_':
            $result = $database->query_run("SELECT account_title,
													FORMAT(debit, 2)debit,
													FORMAT(credit, 2)credit,
													memo,
													location
											FROM add_journal aje
											WHERE transaction_no = '".$_POST['journal_id_']."'
											AND date_transaction = '".$_POST['journal_date_']."' 
											AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY mainaccount_no ASC;");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'modal_journal_':
            $result = $database->query_run("SELECT
												transaction_no,
												memo,
												date_transaction,
												location,
												journal_type,
												FORMAT(SUM(debit), 2) AS total_debit,
												FORMAT(SUM(credit), 2) AS total_credit
											FROM
												add_journal
											WHERE
												date_transaction = '".$_POST['journal_date_']."' 
												AND transaction_no = '".$_POST['journal_id_']."'
											GROUP BY
												transaction_no
											ORDER BY
												id DESC");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;


		case 'journal_account_title_':
            $result = $database->query_run("SELECT account_title 
												FROM add_journal 
											WHERE transaction_no = '".$_POST['code_']."'
											AND date_transaction = '".$_POST['date_']."' 
											AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY mainaccount_no DESC;");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'journal_debit_':
            $result = $database->query_run("SELECT IF(debit = '0.0000','-',FORMAT(debit, 2))debit 
												FROM add_journal 
											WHERE transaction_no = '".$_POST['code_']."'
											AND date_transaction = '".$_POST['date_']."'  
											AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY mainaccount_no DESC;");
			$supData = array();
			while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
			}
			echo json_encode($supData);			
		break;

		case 'journal_credit_':
            $result = $database->query_run("SELECT IF(credit = '0.0000','-',FORMAT(credit, 2))credit    
												FROM add_journal
											WHERE transaction_no = '".$_POST['code_']."'
											AND date_transaction = '".$_POST['date_']."' 
											AND NOT (debit = '0.0000' AND credit = '0.0000')  ORDER BY  mainaccount_no DESC;");
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
else
{
	echo "session-expired";
}



 ?>
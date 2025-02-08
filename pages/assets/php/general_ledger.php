
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

			case 'general_':
				$result = $database->query_run("SELECT
														account_title,
														date_transaction,
														transaction_no,
														mainaccount_no
												FROM `add_journal`
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."'
												GROUP BY mainaccount_no 
												ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'general_date_':
				$result = $database->query_run("SELECT
													transaction_no,
													date_transaction,
													account_title
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."'
												AND mainaccount_no = '".$_POST['code_']."'
												GROUP BY transaction_no ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'general_accountTitle_':
				$result = $database->query_run("SELECT
														memo
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' 
														AND mainaccount_no = '".$_POST['code_']."'
												ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;
			case 'trans_Debits_':
				$result = $database->query_run("SELECT
														FORMAT(SUM(debit), 2) AS debit
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' 
													AND mainaccount_no = '".$_POST['code_']."'
												GROUP BY transaction_no
												ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'general_credit_':
				$result = $database->query_run("SELECT
														FORMAT(SUM(credit), 2) AS credit
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' 
													AND mainaccount_no = '".$_POST['code_']."'
												GROUP BY transaction_no
												ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'balance_debit_':
				$result = $database->query_run("SELECT
														FORMAT(SUM(debit), 2) AS debit,
														FORMAT(SUM(credit), 2) AS credit
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' 
													AND mainaccount_no = '".$_POST['code_']."'
												GROUP BY transaction_no
												ORDER BY mainaccount_no ASC");
				$supData = array();
				while ($row = $result->fetch_assoc()) {
				$supData[] = $row;
				}
				echo json_encode($supData);			
			break;

			case 'balance_credit_':
				$result = $database->query_run("SELECT
														FORMAT(SUM(credit), 2) AS credit,
														FORMAT(SUM(debit), 2) AS debit
												FROM add_journal
												WHERE date_transaction BETWEEN '".$_POST['date_from_']."' AND '".$_POST['date_to_']."' 
													AND mainaccount_no = '".$_POST['code_']."'
												GROUP BY transaction_no
												ORDER BY mainaccount_no ASC");
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
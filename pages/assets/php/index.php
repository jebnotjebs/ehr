<?php 
	session_start();
	include ('config/database.php');
	$formula ='';

	if (isset($_SESSION['employee_id'])) {
			
		if (isset($_POST['formula'])) {
			$formula = $_POST['formula'];
		}
		switch ($formula) {


			case 'check_pages':
			
				$result = $database->query_run("SELECT
													pt.page_description
												FROM
													access_mtrx.page_tbl AS pt
												WHERE
													pt.employee_id = '".$_SESSION['employee_id']."' AND system_code = 'admnshuwan' ");

				$supData = array();
				$_SESSION['pages'] = array();
				$arr = array();
				while ($row = $result->fetch_assoc()) {
					$supData[] = $row;
					$arr[] = $row['page_description'];
				
				}
				$_SESSION['pages'] = $arr;
			
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
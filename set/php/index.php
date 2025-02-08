<?php 
session_start();
include ('../../pages/assets/php/config/database.php');
$formula ='';

if (isset($_SESSION['username'])) {
		
	if (isset($_POST['formula'])) {
		$formula = $_POST['formula'];
	}
	switch ($formula) {

        case 'assign_company_':
            $_SESSION['company_code'] = $_POST['company_'];
            $_SESSION['company_desc'] = $_POST['company_desc_'];
            echo 'x_';
		break;

		case 'company_':
            $result = $database->query_run("SELECT * FROM `ch_company`;");
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
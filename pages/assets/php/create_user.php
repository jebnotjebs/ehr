<?php
include('config/database.php');
$formula = '';

if (isset($_POST['formula'])) {
	$formula = $_POST['formula'];
}
switch ($formula) {


	case 'newuserreg':
		$result = $database->query_run("SELECT * FROM users");
		$supData = array();
		while ($row = $result->fetch_assoc()) {
			$supData[] = $row;
		}
		echo json_encode($supData);
		break;

	case 'change':
		$id = $_POST["id"];
		$status = $_POST["status"];
		$change = ($status == 'Active' ? 'Inactive' : 'Active');

		$query = $database->query_run("UPDATE bankreg SET stats = '$change', updated_by = '$employee_id ' WHERE id = '$id' ");
		echo ($query ? 'success' : $query);
		break;

	case 'edit_row':
		$id = $_POST["edit_id"];
		$edit_username = $_POST["edit_username"];
		$edit_password = $_POST["edit_password"];
	
		$query = $database->query_run("UPDATE users SET username = '$edit_username', password = '$edit_password' WHERE id = '$id'");
		echo ($query ? 'success' : $query);
		break;

	case 'getdata':
		$id = $_POST["id"];
		$query = $database->query_run("SELECT * FROM users WHERE id = '$id' LIMIT 1");
		$row = $query->fetch_assoc();
		echo json_encode($row);
		break;

		// nothing
	// case 'bank_dtls':
	// 	$result = $database->query_run("SELECT `code`, `name` FROM branches");
	// 	$supData = array();
	// 	while ($row = $result->fetch_assoc()) {
	// 		$supData[] = $row;
	// 	}
	// 	echo json_encode($supData);
	// 	break;
	case 'delete_':
		$id =$_POST["id_"];
		
		$query = $database->query_run("DELETE FROM users WHERE id = '$id'"); 
		echo ($query ? 'success' : 'failure');
		break;

	case 'add_row_newuser':
		$username = $_POST["username_"];
		$password = $_POST["password_"];
		
		$existing_data_query = $database->query_run("SELECT * FROM users WHERE username='$username'");
		$existing_data = $existing_data_query->fetch_array();
		
		if (!$existing_data) {

			$query = $database->query_run("INSERT INTO users (username, password) VALUES 
			('$username','$password')");
				
			echo ($query ? 'success' : 'failure');
		} else {
			echo 'Data already exists';
		}
		break;

	case 'usert_':
		$result = $database->query_run("SELECT * FROM `users`");
		$supData = array();
		while ($row = $result->fetch_assoc()) {
			$supData[] = $row;
		}
		echo json_encode($supData);
		break;




	default:
		break;
}

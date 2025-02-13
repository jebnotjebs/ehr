<?php

class Database
{

	public $con;

	function __construct()
	{

		$this->open_db();
	}
	public function open_db() {
		$host 	= 	"localhost";  
		$user 	= 	"root";
		$pass 	= 	"";
		$db 	= 	'newproj';
		$this->con = new mysqli($host,$user,$pass,$db);
		if ($this->con->connect_errno) {
			echo "Failed to connect to MySQL: " . $this->con->connect_error;
			exit();

		}
		$this->con->set_charset("utf8");
	}

	public function query_run($query)
	{

		$query_run = $this->con->query($query);
		if ($query_run) {
			return $query_run;
		} else {
			return $this->con->error;
		}
	}

	public function prepareAndExecute($query, $params = [], $isSelectQuery = true)
	{
		$stmt = $this->con->prepare($query);

		if (!$stmt) {
			throw new Exception("Error preparing statement: " . $this->con->error);
		}

		if (!empty($params)) {
			$types = str_repeat("s", count($params));
			$stmt->bind_param($types, ...$params);
		}

		if (!$stmt->execute()) {

			return 'Error executing statement: ' . $stmt->error;
		}

		if ($isSelectQuery) {
			$result = $stmt->get_result();
			$data = [];
			while ($row = $result->fetch_assoc()) {
				$data[] = $row;
			}
			$stmt->close();
			return $data; // Return result data for SELECT query
		} else {
			$affectedRows = $stmt->affected_rows;
			$stmt->close();
			return $affectedRows > 0 ? true : false; // Return true if affected rows > 0
		}
	}


	public function esc($post)
	{
		return $this->con->real_escape_string($post);
	}

	public function fetch_arrays($query_run)
	{

		return $query_run->fetch_array();
	}

	public function escape_string($value)
	{
		return $this->con->real_escape_string($value);
	}
}
$database = new Database();

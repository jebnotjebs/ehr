<?php
session_start();
require_once '../pages/assets/php/config/database.php';

// Check if database connection is established
if (!isset($database) || !$database) {
    die("Database connection failed.");
}

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $query = "SELECT * FROM L WHERE username = ? AND password = ?";
    $params = [$username, $password];

    try {
        $result = $database->prepareAndExecute($query, $params);

        if (!empty($result)) {
            $data = $result[0];
            $_SESSION["username"] = $data["username"];
            echo $_SESSION['username'];
        } else {
            echo 'empty';
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Employee ID and password are required.";
}
?>

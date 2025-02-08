<?php 
    session_start();
    unset($_SESSION['employee_id']);
    session_destroy();

    header("location: index.php");
?>
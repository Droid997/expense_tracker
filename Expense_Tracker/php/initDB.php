<?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = mysqli_connect($servername, $username, $password);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database
$sql = "CREATE DATABASE expense_tracker";
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully";
	$db="expense_tracker";
	$conn = mysqli_connect($servername, $username, $password,$db);
	$clientTable= "CREATE TABLE clients ( client_id int(10) NOT NULL,client_name varchar(255) NOT NULL,PRIMARY KEY (client_id))";
	mysqli_query($conn, $clientTable);
	
	$expenses_table="CREATE TABLE expenses ( client_id INT(10) NOT NULL , title VARCHAR(255) NOT NULL , currency VARCHAR(10) NOT NULL , amount INT(100) NOT NULL , time TIMESTAMP NOT NULL , description VARCHAR(500) NULL )";
	mysqli_query($conn,$expenses_table);
} else {
    echo "Error creating database: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
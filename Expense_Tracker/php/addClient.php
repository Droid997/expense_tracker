<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "expense_tracker";

// Create connection

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

	$name=$_POST["name"];

	$sql = "select * from clients";
 
	$res = mysqli_query($conn,$sql);
	$count=mysqli_num_rows($res);
	$count+=1;
  
	$insert_sql="INSERT INTO `clients`(`client_id`, `client_name`) VALUES ('$count','$name')";
	mysqli_query($conn,$insert_sql);
	
?>
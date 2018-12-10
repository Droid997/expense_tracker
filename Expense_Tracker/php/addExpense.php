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

	$client_id=$_POST["client_id"];
	$title=$_POST["title"];
	$currency=$_POST["currency"];
	$amount=$_POST["amount"];
	//$time=$_POST["time"];
	$description=$_POST["description"];
	
	$now = new DateTime();
	$now->setTimezone(new DateTimeZone('Asia/Calcutta')); 
	$current_timeStamp=$now->format('Y-m-d H:i:s');

	$insert_sql="INSERT INTO `expenses`(`client_id`, `title`, `currency`, `amount`, `time`, `description`) VALUES ('$client_id','$title','$currency','$amount','$current_timeStamp','$description')";
	
	if(mysqli_query($conn,$insert_sql))
	{
		echo "inserted succesfully";
	}else
	{
		echo mysqli_error($conn);
	}
	
?>
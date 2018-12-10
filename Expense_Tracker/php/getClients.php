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

  $sql = "select * from clients";
 
  $res = mysqli_query($conn,$sql);
 
  $result = array();
 
  while($row = mysqli_fetch_array($res)){
  array_push($result,array('client_id'=>$row[0],'client_name'=>$row[1]));
  }
 
  echo json_encode(array('result'=>$result));
?>
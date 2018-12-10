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

	$id=$_POST["client_id"];

	$sql = "select * from expenses where client_id=$id";
 
  $res = mysqli_query($conn,$sql);
 
  $result = array();
 
  while($row = mysqli_fetch_array($res)){
  array_push($result,array('client_id'=>$row[0],'title'=>$row[1],'currency'=>$row[2],'amount'=>$row[3],'time'=>$row[4],'description'=>$row[5]));
  }
 
  echo json_encode(array('result'=>$result));
?>
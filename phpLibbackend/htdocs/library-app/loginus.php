<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// connect to database
$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "library-app";
$conn = new mysqli($servername, $username, $password, $dbname);

// to check my connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get the submitted username and password
$uid = $_POST["uid"];
$pwd = $_POST["pwd"];

// Validate the username and password
$sql = "SELECT * FROM users WHERE users_uid = '$uid' AND users_pwd = '$pwd'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // If the user is valid, return their user data
  $row = $result->fetch_assoc();
  $user = array(
    "id" => $row["id"],
    "username" => $row["username"],
    "email" => $row["email"]
  );
  echo json_encode($user);
} else {
  // If the user is not valid, return an error
  http_response_code(401);
  echo "Invalid username or password";
}

$conn->close();
?>
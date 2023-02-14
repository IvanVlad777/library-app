<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'));
var_dump($data);
if ($data === null) {
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

$username = $data->uid;
$email = $data->email;
$password = $data->pwd;
$confirmPassword = $data->pwdrepeat;

$connect = mysqli_connect('localhost:3306',"root","");
mysqli_select_db($connect,"library-app");

$sql = "INSERT INTO users (users_uid, users_pwd, users_email) VALUES ('$username', '$password', '$email')";
$result = mysqli_query($connect,$sql);

$response = [];

if($result) {
    $response['data']=array(
        'status'=>'valid'
    );
    echo json_encode($response);
} else {
    $response['data']=array(
        'status'=>'invalid'
    );
    echo json_encode($response);
}

?>
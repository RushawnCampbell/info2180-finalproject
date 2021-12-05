<?php
require_once "dbconnect.php";

$cleanedfname = filter_var('Super', FILTER_SANITIZE_SPECIAL_CHARS);
$cleanedlname = filter_var('User', FILTER_SANITIZE_SPECIAL_CHARS);
$cleanedemail= filter_var('admin@project2.com', FILTER_VALIDATE_EMAIL);
$pass = password_hash('password123', PASSWORD_DEFAULT);
$datejoined = date('Y/m/d H:i:s');

$prep = $conn -> prepare("INSERT INTO userstable (firstname, lastname, password, email, date_joined) 
VALUES ( :firstname, :lastname, :pass, :email, :date_joined)");

$prep->bindParam(':firstname', $cleanedfname);
$prep->bindParam(':lastname', $cleanedlname);
$prep->bindParam(':pass', $pass);
$prep->bindParam(':email', $cleanedemail);
$prep->bindParam(':date_joined', $datejoined);

if ($prep -> execute()){
    echo "Inserted";
}





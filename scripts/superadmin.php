<?php
require_once "dbconnect.php";

$firstname = 'Super';
$lastname = 'Admin';
$email= 'admin@project2.com';
$pass = password_hash('password123', PASSWORD_DEFAULT);
$datejoined = date('Y/m/d H:i:s');

$prep = $conn -> prepare("INSERT INTO userstable (firstname, lastname, password, email, date_joined) 
VALUES ( :firstname, :lastname, :pass, :email, :date_joined)");

$prep->bindParam(':firstname', $firstname);
$prep->bindParam(':lastname', $lastname);
$prep->bindParam(':pass', $pass);
$prep->bindParam(':email', $email);
$prep->bindParam(':date_joined', $datejoined);

if ($prep -> execute()){
    echo "Inserted";
}
else{
    echo "Not Inserted";
}

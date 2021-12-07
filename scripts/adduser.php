<?php
session_start();
require "dbconnect.php";
$cleanedfname = "";
$cleanedlname="";
$cleanedemail= "";
$password = "";
$datejoined = date('Y/m/d H:i:s');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_SESSION['first_name'], $_SESSION['last_name'])){

    $jsn = file_get_contents('php://input');
    $data = json_decode($jsn);
    $cleanedemail = filter_var($data->email, FILTER_VALIDATE_EMAIL);
    $cleanedfname = filter_var($data->firstname, FILTER_SANITIZE_SPECIAL_CHARS);
    $cleanedlname = filter_var($data->lastname, FILTER_SANITIZE_SPECIAL_CHARS);
   
    if (!filter_var($cleanedemail, FILTER_VALIDATE_EMAIL)){
        echo"0";
    }
    if (!filter_var($cleanedfname, FILTER_SANITIZE_SPECIAL_CHARS)){
        echo"1";
    }
    if (!filter_var($cleanedlname, FILTER_SANITIZE_SPECIAL_CHARS)){
        echo"2";
    }
   
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $checksql = "SELECT * FROM userstable WHERE email= :email";
    $stmt = $conn->prepare($checksql);
    $stmt->execute(array(':email' =>  $cleanedemail));
    $record = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() == 1){
        echo"3";
    }
    else{
        $addsql = "INSERT INTO userstable (firstname, lastname, password, email, date_joined) 
        VALUES ( :firstname, :lastname, :pass, :email, :date_joined)";

        $prep = $conn -> prepare($addsql);

        if ($prep->execute( array(':firstname' => $cleanedfname, ':lastname' => $cleanedlname, ':pass'=>$password, ':email' => $cleanedemail, ':date_joined' => $datejoined))){
            echo "4";
        }
        
    }    
}
else{
    echo "We can't process your request at this time";
}
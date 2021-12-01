<?php
require "dbconnect.php";
session_start();
$cleanedemail= "";
$password = "";

if ($_SERVER['REQUEST_METHOD'] == "POST"){

    $jsn = file_get_contents('php://input');
    $data = json_decode($jsn);

    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)){
        echo "2";
    }
    else{
        $password = $data->password;
        $cleanedemail = $data->email;
        $sql = "SELECT * FROM userstable WHERE email= :email";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array(':email' =>  $cleanedemail));
        $record = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() == 1){
            if (!password_verify($password, $record["password"])){
                echo "1";
            }
            else{ 
                $_SESSION['id'] = $record['id'];
                $_SESSION['email'] = $record['email'];
                echo "4";
            } 
        }
        else{
            echo "0";
        }
    }
}
else{
    echo "No";
}





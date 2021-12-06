<?php
session_start();
require "dbconnect.php";
$cleanedtitle= "";
$cleaneddescript="";
$cleanedassign= "";
$cleanedtype= "";
$cleanedpriority="";
$status = "Open";
$createdby = $_SESSION['uid'];

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    $jsn = file_get_contents('php://input');
    $data = json_decode($jsn);
    $cleanedtitle = filter_var($data->title, FILTER_SANITIZE_SPECIAL_CHARS);
    $cleaneddescript = filter_var($data->description, FILTER_SANITIZE_SPECIAL_CHARS);
    $cleanedassign = filter_var($data->assign, FILTER_SANITIZE_SPECIAL_CHARS);
    $cleanedassign = explode(" ", $cleanedassign);
    $fname= $cleanedassign[0];
    $lname= $cleanedassign[1];
    $cleanedtype = filter_var($data->type, FILTER_SANITIZE_SPECIAL_CHARS);
    $cleanedpriority= filter_var($data->priority, FILTER_SANITIZE_SPECIAL_CHARS);
    $currentdatetime = date('Y/m/d');

    $idsql = "SELECT * FROM userstable WHERE firstname = :fname AND lastname = :lname";
    $idstmt =  $conn -> prepare($idsql);
    $idstmt->execute(array(
        ':fname' => $fname,
        ':lname' => $lname
    ));
    $user = $idstmt->fetch(PDO::FETCH_ASSOC);
    $cleanedassign = $user['id'];
   
    $sql = "INSERT INTO issuestable (title, description, type, priority, status, assigned_to, created_by, created, updated) 
    VALUES (:title, :descript, :typ, :priority, :stat,  :assigned_to, :createdby, :created, :updated)";

     $prep = $conn -> prepare($sql);
     

    if ($prep -> execute( array(
        ':title' => $cleanedtitle, 
        ':descript' => $cleaneddescript, 
        ':typ' => $cleanedtype, 
        ':priority' => $cleanedpriority, 
        ':stat' => $status, 
        ':assigned_to' => $cleanedassign, 
        ':createdby' => $createdby, 
        ':created' => $currentdatetime,
        ':updated' => $currentdatetime) ) ) 
        {
        echo "OK";
    }
    else{
        echo "NO";
    }

}
else{
    echo "We can't process your request at this time";
}
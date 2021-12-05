<?php
session_start();
require "dbconnect.php";

if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_SESSION['first_name'])&& isset($_SESSION['last_name'])){

$check = $_GET['check'];
$issueid = $_GET['issueid'];
$updated =  date('Y/m/d H:i:s');

if($check == "mkasclose"){
   $timesql = "UPDATE issuestable SET updated = :updated WHERE id = :id";
   $timestmt = $conn -> prepare($timesql);
   $timestmt->execute(array(
       ':updated' => $updated,
       'id' => $issueid
   ));

   $statussql = "UPDATE issuestable SET status = :stat WHERE id = :id";
   $statusstmt = $conn->prepare($statussql);
   $statusstmt->execute(array(
       ':stat' => "Closed",
       ':id' => $issueid
   ));

   echo "<span>&#5171;</span> Last updated on {$updated}";
}
else if( $check == "mkinpro"){

   $timesql = "UPDATE issuestable SET updated = :updated WHERE id = :id";
   $timestmt = $conn -> prepare($timesql);
   $timestmt->execute(array(
       ':updated' => $updated,
       'id' => $issueid
   ));

   $statussql = "UPDATE issuestable SET status = :stat WHERE id = :id";
   $statusstmt = $conn->prepare($statussql);
   $statusstmt->execute(array(
       ':stat' => "In Progress",
       ':id' => $issueid
   ));

   echo "<span>&#5171;</span> Last updated on {$updated}";

}
}
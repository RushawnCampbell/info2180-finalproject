<?php
session_start();
require "dbconnect.php";

if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_SESSION['first_name'])&& isset($_SESSION['last_name'])){

$check = $_GET['check'];
$issueid = $_GET['issueid'];
date_default_timezone_set('US/Eastern');
$updated =  date('Y-m-d H:i:s');
$closedstat = "Closed";
$inprostat = "In Progress";

$issuesql = "SELECT * FROM issuestable WHERE id = :id";
  $issuestmt = $conn -> prepare($issuesql);
  $issuestmt->execute(array(
      ':id' => $issueid
  ));
$issue = $issuestmt->fetch(PDO::FETCH_ASSOC);
$updatedday= date('F jS, Y',strtotime($updated));
$updatedtime = date('h:i A',strtotime($updated));


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
       ':stat' => $closedstat,
       ':id' => $issueid
   ));

   echo "<span>&#5171;</span> Last updated on {$updatedday} at {$updatedtime} * <span id=\"statuspan\">{$closedstat}</span>";
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
       ':stat' => $inprostat,
       ':id' => $issueid
   ));

   echo "<span>&#5171;</span> Last updated on {$updatedday} at {$updatedtime} * <span id=\"statuspan\">{$inprostat}</span>";

}
}
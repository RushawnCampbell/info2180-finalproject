<?php
session_start();
require "dbconnect.php";
if ($_SERVER['REQUEST_METHOD'] == "GET" && isset($_SESSION['first_name'])&& isset($_SESSION['last_name'])){
  $id= $_GET['issueid'];

  $issuesql = "SELECT * FROM issuestable WHERE id = :id";
  $issuestmt = $conn -> prepare($issuesql);
  $issuestmt->execute(array(
      ':id' => $id
  ));
  $issue = $issuestmt->fetch(PDO::FETCH_ASSOC);

  $assignsql = "SELECT * FROM userstable WHERE id = :id";
  $assignstmt = $conn -> prepare($assignsql);
  $assignstmt->execute(array(
        ':id' => $issue['assigned_to']
  ));
  $assigneduser = $assignstmt->fetch(PDO::FETCH_ASSOC);

  $creatorsql = "SELECT * FROM userstable WHERE id = :id";
  $creatorstmt = $conn -> prepare($creatorsql);
  $creatorstmt->execute(array(
        ':id' => $issue['created_by']
  ));
  $creator = $creatorstmt->fetch(PDO::FETCH_ASSOC);

  $singleissue = "
               <div id=\"issueparent\"> 
                <section id= \"issuehead\"> 
                    <h1> {$issue['title']} </h1>
                    <span>Issue #{$id}</span>
                </section>
                <section id=\"issuebody\"> 
                   <section id=\"contentcombo\"> 
                        <article id=\"description\"> {$issue['description']}</article>
                        <section id=\"issuemetasec\">
                            <p class=\"issuemeta\"> <span>&#5171;</span>  Issue created on {$issue['created']} by {$creator['firstname']} {$creator['lastname']} </p>
                            <p class=\"issuemeta\"> <span>&#5171;</span>  Last updated on {$issue['updated']}</p>
                        </section>
                   </section>
                   
                   <aside id=\"issueaside\">
                        <section id=\"infobox\">
                            <div class=\"infogrp\">
                                <span class=\"label\">Assigned To</span>
                                <span>{$assigneduser['firstname']} {$assigneduser['lastname']}</span>
                            </div>
                            <div class=\"infogrp\">
                                <span class=\"label\">Type</span>
                                <span>{$issue['type']}</span>
                            </div>
                            <div class=\"infogrp\">
                                <span class=\"label\">Status</span>
                                <span>{$issue['status']}</span>
                            </div>
                        </section>
                        <button id=\"mkasclose\">Mark as Closed</button>
                        <button id=\"mkinpro\"> Mark in Progress</button>
                   </aside>
                </section> </div>";

                echo $singleissue;
}

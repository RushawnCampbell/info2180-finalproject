<?php
session_start();
require "dbconnect.php";
if (isset($_SESSION['first_name'])&& isset($_SESSION['last_name'])){

    $sql = "SELECT * FROM issuestable";
    $stmt = $conn->query($sql);
    $issues = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $tableconstruct= "
       <section id=\"issuelistheaduniverse\">
        <section class=\"issuelistheadparent\">
            <h1 class=\"issuelisthead\"> Issues </h1>
            <button id=\"createissuebtn\"> Create New Issue </button>
        </section>
        <section id=\"filter\"> 
            <label>Filter by: </label>
            <button id=\"all\"> ALL </button>
            <button id=\"open\"> OPEN </button>
            <button id=\"mytickets\"> MY TICKETS</button>
        </section></section>
        <table id='issuetable'>
            <thead>
                <th>Title</th> 
                <th>Type</th>
                <th>Status</th> 
                <th>Assigned To</th>  
                <th>Created</th> 
            </thead>";

            foreach($issues as $issue){
                $namesql = "SELECT * FROM userstable WHERE id = :id";
                $namestmt = $conn -> prepare($namesql);
                $namestmt->execute(array(
                    ':id' => $issue['assigned_to']
                ));
                $user = $namestmt->fetch(PDO::FETCH_ASSOC);

                $tableconstruct .= 
                "<tr class=\"temprow\"> 
                 <td><span class=\"ticketnum\">#{$issue['id']}</span><a href=\"{$issue['id']}\">{$issue['title']}</a></td>
                 <td>{$issue['type']} </td>
                 <td>{$issue['status']}</td>
                 <td>{$user['firstname']} {$user['lastname']} </td>
                 <td>{$issue['created']}</td>
                </tr>";  
             }

             $tableconstruct.=  "</table>";
             echo $tableconstruct;
}

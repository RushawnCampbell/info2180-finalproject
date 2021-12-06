<?php
session_start();
require "dbconnect.php";
if (isset($_SESSION['first_name'])&& isset($_SESSION['last_name'])){
    $tableconstruct = "";
    if($_GET['btn'] == "open"){
        $status = "Open";
        $opensql = "SELECT * FROM issuestable WHERE status = :stat";
        $openstmt = $conn->prepare($opensql);
        $openstmt->execute(array(
            ':stat' => $status
        ));
        $openissues = $openstmt->fetchAll(PDO::FETCH_ASSOC);
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
    
                foreach($openissues as $openissue){
                    $namesql = "SELECT * FROM userstable WHERE id = :id";
                    $namestmt = $conn -> prepare($namesql);
                    $namestmt->execute(array(
                        ':id' => $openissue['assigned_to']
                    ));
                    $user = $namestmt->fetch(PDO::FETCH_ASSOC);
    
                    $tableconstruct .= 
                    "<tr class=\"temprow\"> 
                     <td><span class=\"ticketnum\">#{$openissue['id']}</span><a href=\"{$openissue['id']}\">{$openissue['title']}</a></td>
                     <td>{$openissue['type']} </td>
                     <td>{$openissue['status']}</td>
                     <td>{$user['firstname']} {$user['lastname']} </td>
                     <td>{$openissue['created']}</td>
                    </tr>";  
                 }
    
                 $tableconstruct.=  "</table>";

    }
    else if($_GET['btn'] == "mytickets"){
        $myid = $_SESSION['uid'];
        $mytkssql = "SELECT * FROM issuestable WHERE created_by = :myid";
        $mytksstmt = $conn->prepare($mytkssql);
        $mytksstmt->execute(array(
            ':myid' => $myid
        ));
        $myissues = $mytksstmt->fetchAll(PDO::FETCH_ASSOC);
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
    
                foreach($myissues as $myissue){
                    $namesql = "SELECT * FROM userstable WHERE id = :id";
                    $namestmt = $conn -> prepare($namesql);
                    $namestmt->execute(array(
                        ':id' => $myissue['assigned_to']
                    ));
                    $user = $namestmt->fetch(PDO::FETCH_ASSOC);
    
                    $tableconstruct .= 
                    "<tr class=\"temprow\"> 
                     <td><span class=\"ticketnum\">#{$myissue['id']}</span><a href=\"{$myissue['id']}\">{$myissue['title']}</a></td>
                     <td>{$myissue['type']} </td>
                     <td>{$myissue['status']}</td>
                     <td>{$user['firstname']} {$user['lastname']} </td>
                     <td>{$myissue['created']}</td>
                    </tr>";  
                 }
    
                 $tableconstruct.=  "</table>";
        
    }
    else if ($_GET['btn'] == "all"){
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
                

    }

    echo $tableconstruct;
}

<?php
session_start(); 
require "dbconnect.php";

if (!isset($_SESSION['uid'], $_SESSION['first_name'], $_SESSION['last_name'])){
    echo "OOPs, your session was disrupted, try again later.";
}
else {

$sql = "SELECT * FROM userstable";
$stmt = $conn->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);


$formconstruct = 
" <form id='issueform'>
        <h2 class='formtitle'>Create Issue</h2>
            <div class='newissuestat'> </div>
            <div class='formstatus'> </div>
            <div class='formgrp'> 
                <label>Title</label>
                <input id ='title'class='inputnormal' type='text' placeholder='type title here' name='title' required>
            </div>
            <div class='formgrp'> 
                <label>Description</label>
                <textarea form='issueform' rows='5' cols='50' class='txtANormal' id='txtarea'> </textarea>
            </div>
            <div class='formgrp'> 
                <label for='assign'>Assigned To</label>
                <select class='inputnormal' name='assign' id='assign'>";

                foreach($users as $user){
                  $formconstruct .= "<option value= \"{$user['firstname']} {$user['lastname']} \"> {$user['firstname']} {$user['lastname']} </option> ";  
               }
             $formconstruct.= 
             "</select>
            </div>
            <div class='formgrp'> 
                <label for='Type'>Type</label>
                <select class='inputnormal' name='type' id='type'>
                    <option value='Bug'>Bug</option>
                    <option value='Proposal'>Proposal</option>
                    <option value='Task'>Task</option>
                </select>
            </div>
            <div class='formgrp'> 
                <label for='priority'>Priority</label>
                <select class='inputnormal' name='priority' id='priority'>
                    <option value='Minor'>Minor</option>
                    <option value='Major'>Major</option>
                    <option value='Critical'>Critical</option>
                </select>
            </div>
               
            <button type= 'submit' name='addissuebtn' id='addissuebtn'> Submit </button>
        </form>";

        echo $formconstruct;

} 
?>
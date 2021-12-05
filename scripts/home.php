<?php
session_start();
if (isset($_SESSION['uid'], $_SESSION['email'])){
    echo "home";
}


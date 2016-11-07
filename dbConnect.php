<?php
$servername = "localhost";
$username = "a4256217_interli";
$password = "interlink6655";
$db = "a4256217_interli";

// Create connection
$conn = mysqli_connect($servername,$username, $password,$db);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
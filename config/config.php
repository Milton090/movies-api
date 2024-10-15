<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'movies_db';

$api_key = 'abd010a1';

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>

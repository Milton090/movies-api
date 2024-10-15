<?php
header('Content-Type: application/json');
include '../config/config.php';

$result = $connection->query("SELECT * FROM movies");
$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
$connection->close();
?>

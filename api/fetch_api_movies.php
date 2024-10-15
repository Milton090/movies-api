<?php
include '../config/config.php';

$title = $_GET['title'] ?? '';

if (empty($title)) {
    echo json_encode(['Response' => 'False', 'Error' => 'No title provided']);
    exit;
}

$url = "http://www.omdbapi.com/?s=" . urlencode($title) . "&apikey=" . $api_key;
$response = file_get_contents($url);
echo $response;
?>

<?php
include '../config/config.php';

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'];
$year = $data['year'];
$imdbID = $data['imdbID'];

$url = "http://www.omdbapi.com/?i=" . $imdbID . "&apikey=" . $api_key;
$movie_data = json_decode(file_get_contents($url), true);

if ($movie_data['Response'] === 'True') {
    $director = $movie_data['Director'];
    $genre = $movie_data['Genre'];

    $stmt = $connection->prepare("INSERT INTO movies (title, year, director, genre, imdbID) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $year, $director, $genre, $imdbID);
    $stmt->execute();

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$connection->close();
?>

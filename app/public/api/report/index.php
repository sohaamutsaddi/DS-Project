<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment';
$vars = [];

if (isset($_GET['referee'])) {
  // This is an example of a parameterized query
    $sql = 'SELECT field, gameTime, matchDate, ref_status, position 
    FROM games left outer join assignment on assignment.matchID = games.gameID WHERE refereeID = ?';
    $vars = [ $_GET['referee']];
}
// matchDate > ?, matchDate < ?'
// $_GET['start'], $_GET['end'] 

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
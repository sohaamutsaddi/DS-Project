<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT field, matchDate, ref_status, position, firstName, lastName
from assignment left outer join games on assignment.matchID = games.gameID right outer join referee on assignment.refereeID = referee.refID
where ref_status = "Unassigned"';

$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Field,Date,Status,Position,First,Last\r\n";

  foreach($offers as $o){
    echo "\"".$o['field']. "\","
        .$o['matchDate']. ","
        .$o['ref_status']. ","
        .$o['position']. ","
        .$o['firstName']. ","
        .$o['lastName']. "\r\n";
    }


} else {

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
<?php
$dbuser  = '';
$dbpass  = '';
$dbname  = '';
$dbtable = 'visitors';

header("HTTP/1.0 200 OK");

$mysqli = new mysqli("localhost", $dbuser, $dbpass, $dbname);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$query = ("SELECT `id`, `handle`, `group`, `country`, `email` from $dbtable ORDER BY `id`");
$result = $mysqli->query($query);

$array_data = array();

while($row = $result->fetch_row()) {
	$default = 'retro';
	$image = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( html_entity_decode($row[4]) ) ) ) . "?d=" . urlencode( $default ) . "&s=40&r=x";
	array_push($array_data, array('handle' => html_entity_decode($row[1]), 'group' => html_entity_decode($row[2]), 'country' => html_entity_decode($row[3]), 'image' => $image));
}

$data = array('success' => true, 'data' => $array_data);

header('Content-Type: application/json');
echo json_encode($data);

mysqli_free_result($result);
mysqli_close($mysqli);

exit(0);

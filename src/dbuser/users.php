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

$query = ("SELECT `id`, `handle`, `group`, `country` from $dbtable ORDER BY `id`");

$result = $mysqli->query($query);

//$row = $result->fetch_array(MYSQLI_ASSOC);

$array_data = array();

while($row = $result->fetch_row()) {
	array_push($array_data, array('handle' => $row[1], 'group' => $row[2], 'country' => $row[3]));
}

$data = array('code' => 200, 'success' => true, 'data' => $array_data);

header('Content-Type: application/json');
echo json_encode($data);

mysqli_free_result($result);
mysqli_close($link);

exit(0);
?>

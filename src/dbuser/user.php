<?php
$dbuser  = '';
$dbpass  = '';
$dbname  = '';
$dbtable = 'visitors';

$country = $email = $group = $handle = $ip = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $country = test_input($_POST["country"]);
  $email = test_input($_POST["email"]);
  $group = test_input($_POST["group"]);
  $handle = test_input($_POST["handle"]);
  $ip = test_input($_SERVER['REMOTE_ADDR']);

  if ( $country !== '' && $email !== '' && $group !== '' && $handle !== '' ) {

	$mysqli = new mysqli("localhost", $dbuser, $dbpass, $dbname);

	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	if (!$mysqli->query("INSERT INTO `$dbtable`(`country`,`email`,`group`,`handle`,`ip`) VALUES ('$country', '$email', '$group', '$handle', '$ip')")) {

		$data = array('code' => 503, 'success' => false, 'message' => 'There was an error saving your data, please contact support. Error ' . $mysqli->errno);
		header('Content-Type: application/json');
		echo json_encode($data);

		mysqli_close($link);
		exit(0);

	} else {
		
		$data = array('success' => true, 'message' => 'Thanks for registering!');
		header('Content-Type: application/json');
		echo json_encode($data);
	
		mysqli_close($link);
		exit(0);

	}
	
  } else {
	
	$data = array('code' => 503, 'success' => false, 'message' => 'Please fill out all the fields!');
	header('Content-Type: application/json');
	echo json_encode($data);

	mysqli_close($link);
	exit(0);
  }

}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>

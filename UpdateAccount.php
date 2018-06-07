<?php
	$inData = getRequestInfo();

	$Login = $inData["Login"];
	$Password= $inData["Password"];
	$Contactfirst = $inData["Contactfirst"];
  $Contactlast = $inData["Contactlast"];
	$parent_id = $inData["parent_id"];
	//$conn = new mysqli("localhost", "leinecke_SaRcc", "Wash9Lives!", "leinecke_COP4331");
	$conn = new mysqli("localhost", "ucfgroup3", "abc123", "UCFProject");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "UPDATE Users set Login = '$Login', Password = '$Password', firstName = '$Contactfirst', lastName = '$Contactlast' where parent_id = '$parent_id'";
		//$sql = "UPDATE Users set 'Login' = '$Login', 'Password' = '$Password', 'firstName' = '$Contactfirst', 'lastName' = '$Contactlast' WHERE 'parent_id' = '$parent_id'";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}

	returnWithError("Added!!!");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>

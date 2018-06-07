<?php
	$inData = getRequestInfo();


	$Dfist= $inData["Contactfirst"];
	$Dlast = $inData["Contactlast"];
	$Dphone = $inData["Phonenumber"];
	$parent_id = $inData["parent_id"];
	$conn = new mysqli("localhost", "ucfgroup3", "abc123", "UCFProject");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{

$sql = "DELETE FROM Contacts Where Contactfirst ='" . $Dfist. "' and Contactlast ='" . $Dlast. "' and  Phonenumber ='" . $Dphone. "' and parent_id = '" .$parent_id. "' ";

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

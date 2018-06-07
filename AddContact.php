<?php
	$inData = getRequestInfo();

	$City = $inData["City"];
	$ContactsID= $inData["ContactsID"];
	$Contactfirst = $inData["Contactfirst"];
  $Contactlast = $inData["Contactlast"];
	$Phonenumber = $inData["Phonenumber"];
	$Email = $inData["Email"];
	$Address = $inData["Address"];
	$Zip = $inData["Zip"];
	$State = $inData["State"];
	//$conn = new mysqli("localhost", "leinecke_SaRcc", "Wash9Lives!", "leinecke_COP4331");
	$conn = new mysqli("localhost", "ucfgroup3", "abc123", "UCFProject");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
	//	$sql = "insert into Contacts (City)
		//VALUES ('". $City . "')";
$sql = "insert into Contacts (City,Contactfirst,Contactlast,Phonenumber,Email,Address,Zip,State,parent_id)	VALUES ('". $City . "','" . $Contactfirst . "','" . $Contactlast . "','" . $Phonenumber . "','" . $Email . "','" . $Address . "'," . $Zip . ",'" . $State . "','" . $ContactsID . "')";
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

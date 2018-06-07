<?php
	$inData = getRequestInfo();

	$Cfirst = $inData["Cfirst"];
	$Clast = $inData["Clast"];
	$Cphone = $inData["Cphone"];
	$City = $inData["City"];
	$Contactfirst = $inData["Contactfirst"];
  $Contactlast = $inData["Contactlast"];
	$Phonenumber = $inData["Phonenumber"];
	$Email = $inData["Email"];
	$Address = $inData["Address"];
	$Zip = $inData["Zip"];
	$State = $inData["State"];
	$parent_id = $inData["parent_id"];


	$conn = new mysqli("localhost", "ucfgroup3", "abc123", "UCFProject");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
	//	$sql = "UPDATE Contacts set  Zip = $Zip where parent_id = '$parent_id'";
		$sql = "UPDATE Contacts set City = '$City', Contactfirst = '$Contactfirst', Contactlast = '$Contactlast', Phonenumber = '$Phonenumber', Email = '$Email', Address = '$Address', State = '$State', Zip = '$Zip'
		where parent_id = '$parent_id' and Contactfirst = '$Cfirst' and Contactlast = '$Clast' and Phonenumber = '$Cphone'";
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

<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "ucfgroup3", "abc123", "UCFProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT Contactfirst, Contactlast, City, Phonenumber, Email, Address, Zip, State FROM Contacts where Contactfirst LIKE '%" . $inData["search"] . "%'" . "and parent_id = '" . $inData["parent_id"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
      //fetch the first element from result
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
        //add to $searchResults2
				$searchResults .= '"' . $row["Contactfirst"] . ' '. $row["Contactlast"]. " Phone Number: " . $row["Phonenumber"] . " Email: " . $row["Email"] ." Address: "
				. $row["Address"] . ", " . $row["City"] . ", " . $row["State"] . ' ' . $row["Zip"] . '"';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

	function getRequestInfo()
	{
    //takes JSON encoded string and converts to  a PHP var
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
    //Send a raw HTTP header
		header('Content-type: application/json');
    // outputs $obj
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>

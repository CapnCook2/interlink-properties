<?php
	$q = $_REQUEST["q"];
	if($q == "rent") {
		require("dbConnect.php");
		$sql = "SELECT * FROM rent ORDER BY added";
		$result = mysqli_query($conn,$sql);
		$ar =  array();
		while($row = mysqli_fetch_assoc($result)) {
			$ar[] = $row;
		}
		echo json_encode($ar);
	}
	if($q == "sale") {
		require("dbConnect.php");
		$sql = "SELECT * FROM sale ORDER BY added";
		$result = mysqli_query($conn,$sql);
		$ar =  array();
		while($row = mysqli_fetch_assoc($result)) {
			$ar[] = $row;
		}
		echo json_encode($ar);
	}
	if($q == "rent-single") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$sql = "SELECT * FROM rent WHERE id=".$id."";
		//echo "sql: ".$sql;
		$result = mysqli_query($conn,$sql);
		$ar =  array();
		while($row = mysqli_fetch_assoc($result)) {
			$ar[] = $row;
		}
		echo json_encode($ar);
	}
	if($q == "sale-single") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$sql = "SELECT * FROM sale WHERE id=".$id;
		$result = mysqli_query($conn,$sql);
			$ar =  array();
			while($row = mysqli_fetch_assoc($result)) {
				$ar[] = $row;
			}
			echo json_encode($ar);
	}
	if($q == "add-rent") {
		require("dbConnect.php");
		$data = $_REQUEST['data'];
		$sql = "INSERT INTO rent (";
		//keys
		foreach ($data as $key => $value) {
			$sql .= $key .",";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= ") VALUES (";
		//values
		foreach ($data as $key => $value) {
			$sql .= "'".$value ."',";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= ")"	;

		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "New record created successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}
	if($q == "add-sale") {
		require("dbConnect.php");
		$data = $_REQUEST['data'];
		$sql = "INSERT INTO sale (";
		//keys
		foreach ($data as $key => $value) {
			$sql .= $key .",";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= ") VALUES (";
		//values
		foreach ($data as $key => $value) {
			$sql .= "'".$value ."',";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= ")"	;

		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "New record created successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}

	if($q == "edit-rent") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$data = $_REQUEST['data'];
		$sql = "UPDATE rent set ";
		//keys
		foreach ($data as $key => $value) {
			$sql .= $key ."='".$value."',";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= " WHERE id=".$id;

		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "Updated successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}
	if($q == "edit-sale") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$data = $_REQUEST['data'];
		$sql = "UPDATE sale set ";
		//keys
		foreach ($data as $key => $value) {
			$sql .= $key ."='".$value."',";
		}
		if($sql[strlen($sql)-1] == ",")
			$sql = substr($sql,0,strlen($sql)-1);
		$sql .= " WHERE id=".$id;

		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "Updated successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}
	if($q == "rent-delete") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$sql = "DELETE FROM rent WHERE id=".$id;
		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "Deleted successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}
	if($q == "sale-delete") {
		require("dbConnect.php");
		$id = $_REQUEST['id'];
		$sql = "DELETE FROM sale WHERE id=".$id;
		if (mysqli_query($conn,$sql) === TRUE) {
		    echo "Deleted successfully";
		} else {
		    die( "Error: " . $sql . "<br>" . $conn->error);
		}
	}
?>
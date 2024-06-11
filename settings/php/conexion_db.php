<?php

$severName = "localhost";
$database = "login";
$userName = "root";
$password = "";

//realizar conexxion 

$conn = mysqli_connect($severName, $userName, $password, $database);

//checar conexion 

if (!$conn) {
    die("conexion fallida: " .mysqli_connect_error());
}

echo "Conexion exitosa";
mysqli_close($conn);

?>
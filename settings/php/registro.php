<?php

include 'conexion_db.php';

$nombre = $_POST['nom'];
$correo = $_POST['correo'];
$usuario = $_POST['user'];
$password = $_POST['pswd'];

$query = "INSERT INTO usuarios(nombre, correo, usuario, contraseña) 
            VALUES('$nombre', '$correo', '$usuario', '$password')";

$ejecutar = mysqli_query($conn, $query);

?>
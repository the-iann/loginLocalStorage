document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        document.getElementById('nombre').textContent = user.nombre;
        document.getElementById('correo').textContent = user.correo;
        document.getElementById('usuario').textContent = user.usuario;
    } else {
        alert('No hay usuario logueado');
        window.location.href = 'index.html'; // Redirigir al formulario de inicio de sesión si no hay usuario
    }
});

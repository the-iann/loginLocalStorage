const formularioR = document.getElementById('registro');
const inputsR = document.querySelectorAll('#registro input');

const formularioS = document.getElementById('iniciarS');
const inputsS = document.querySelectorAll('#iniciarS input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Validación de correo
    telefono: /^\d{7,14}$/ // 7 a 14 numeros. no se usa pero por si se ocupa luego
}

const validarFormularioR = (e) => {
    switch (e.target.name) {
        case "nom":
            if (expresiones.nombre.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
        case "correo":
            if (expresiones.correo.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
        case "user":
            if (expresiones.usuario.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
        case "pswd":
            if (expresiones.password.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
    }
}

inputsR.forEach((input) => {
    input.addEventListener('keyup', validarFormularioR);
    input.addEventListener('blur', validarFormularioR);
});

formularioR.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nom').value;
    const correo = document.getElementById('correo').value;
    const usuario = document.getElementById('user').value;
    const password = document.getElementById('contraseña').value;

    // Recuperar usuarios existentes de localStorage
    const userDatas = JSON.parse(localStorage.getItem('userDatas')) || [];

    // Verificar si el correo o el nombre de usuario ya existen
    const correoExiste = userDatas.some(user => user.correo === correo);
    const usuarioExiste = userDatas.some(user => user.usuario === usuario);

    if (correoExiste) {
        Swal.fire({
            icon: 'error',
            title: 'Correo ya registrado',
            text: 'El correo ya está registrado. Por favor, use otro correo.'
        });
        return; // Detener el registro si el correo ya existe
    }

    if (usuarioExiste) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El nombre de usuario ya está registrado. Por favor, use otro nombre de usuario.'
        });
        return; // Detener el registro si el nombre de usuario ya existe
    }

    // Guardar en localStorage
    const userData = {
        nombre: nombre,
        correo: correo,
        usuario: usuario,
        password: password
    };

    userDatas.push(userData);
    localStorage.setItem('userDatas', JSON.stringify(userDatas));

    // Guardar el usuario actual
    localStorage.setItem('currentUser', JSON.stringify(userData));

    Swal.fire({
        icon: 'success',
        title: 'Registrado exitosamente',
        text: 'El registro fue exitoso.'
    }).then(() => {
        // Redirigir a la página de perfil
        window.location.href = 'perfil.html';
    });

    // Limpiar los campos y clases de validación
    formularioR.reset();
    inputsR.forEach((input) => {
        input.classList.remove('registro__grupo-correcto');
    });
});

// Validar formulario de inicio de sesión
const validarFormularioS = (e) => {
    switch (e.target.name) {
        case "correoL":
            if (expresiones.correo.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
        case "pswdL":
            if (expresiones.password.test(e.target.value)) {
                e.target.classList.remove('registro__grupo-incorrecto');
                e.target.classList.add('registro__grupo-correcto');
            } else {
                e.target.classList.add('registro__grupo-incorrecto');
                e.target.classList.remove('registro__grupo-correcto');
            }
            break;
    }
}

inputsS.forEach((input) => {
    input.addEventListener('keyup', validarFormularioS);
    input.addEventListener('blur', validarFormularioS);
});

formularioS.addEventListener('submit', (e) => {
    e.preventDefault();

    const correoL = document.querySelector('input[name="correoL"]').value;
    const pswdL = document.querySelector('input[name="pswdL"]').value;

    const userDatas = JSON.parse(localStorage.getItem('userDatas')) || [];
    const user = userDatas.find(user => user.correo === correoL && user.password === pswdL);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'El inicio de sesión fue exitoso.'
        }).then(() => {
            window.location.href = 'perfil.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error en inicio de sesión',
            text: 'Correo o contraseña incorrectos'
        });
    }
});

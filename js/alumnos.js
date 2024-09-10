// alumnos.js

let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

function mostrarAlumnos() {
    const alumnosList = document.getElementById('alumnosList');
    if (alumnosList) {
        alumnosList.innerHTML = '';
        alumnos.forEach((alumno, index) => {
            alumnosList.innerHTML += `<p>${alumno.nombre} (${alumno.edad} años)
            <button onclick="editarAlumno(${index})">Editar</button>
            <button onclick="eliminarAlumno(${index})">Eliminar</button></p>`;
        });
    }
}

document.getElementById('alumnoForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreAlumno').value;
    const edad = document.getElementById('edadAlumno').value;
    const index = document.getElementById('alumnoIndex').value;

    if (index === "") {
        alumnos.push({ nombre, edad });
    } else {
        alumnos[index] = { nombre, edad };
    }

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarAlumnos();
    document.getElementById('nombreAlumno').value = '';
    document.getElementById('edadAlumno').value = '';
    document.getElementById('alumnoIndex').value = '';
    document.getElementById('submitButton').innerText = 'Agregar Alumno';
});

function eliminarAlumno(index) {
    alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarAlumnos();
}

function editarAlumno(index) {
    const alumno = alumnos[index];
    document.getElementById('nombreAlumno').value = alumno.nombre;
    document.getElementById('edadAlumno').value = alumno.edad;
    document.getElementById('alumnoIndex').value = index;
    document.getElementById('submitButton').innerText = 'Guardar';
}

mostrarAlumnos();

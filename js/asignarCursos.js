// Obtener alumnos y cursos desde LocalStorage
let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

function cargarSelectAlumnos() {
    const alumnoSelect = document.getElementById('alumnoSelect');
    alumnoSelect.innerHTML = '<option value="">-- Seleccione un alumno --</option>';
    alumnos.forEach((alumno, index) => {
        alumnoSelect.innerHTML += `<option value="${index}">${alumno.nombre}</option>`;
    });
}

function cargarSelectCursos() {
    const cursoSelect = document.getElementById('cursoSelect');
    cursoSelect.innerHTML = '<option value="">-- Seleccione un curso --</option>';
    cursos.forEach((curso, index) => {
        cursoSelect.innerHTML += `<option value="${index}">${curso.nombre}</option>`;
    });
}

// Función para mostrar los cursos asignados al alumno
function mostrarCursosDelAlumno(alumnoIndex) {
    const alumno = alumnos[alumnoIndex];
    const cursosListDiv = document.getElementById('alumnosCursos');
    cursosListDiv.innerHTML = ''; // Limpiar la lista previa

    if (alumno.cursos && alumno.cursos.length > 0) {
        const ul = document.createElement('ul');
        alumno.cursos.forEach((curso, cursoIndex) => {
            const li = document.createElement('li');
            li.textContent = curso;

            // Botón para eliminar curso individualmente
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.onclick = () => eliminarCursoDelAlumno(alumnoIndex, cursoIndex);

            li.appendChild(eliminarButton);
            ul.appendChild(li);
        });
        cursosListDiv.appendChild(ul);
    } else {
        cursosListDiv.innerHTML = '<p>No hay cursos asignados.</p>';
    }
}

// Función para eliminar un curso del alumno
function eliminarCursoDelAlumno(alumnoIndex, cursoIndex) {
    alumnos[alumnoIndex].cursos.splice(cursoIndex, 1); // Eliminar el curso
    localStorage.setItem('alumnos', JSON.stringify(alumnos)); // Actualizar en LocalStorage
    mostrarCursosDelAlumno(alumnoIndex); // Actualizar la lista en la página
}

document.getElementById('asignarForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const alumnoIndex = document.getElementById('alumnoSelect').value;
    const cursoIndex = document.getElementById('cursoSelect').value;

    if (alumnoIndex !== "" && cursoIndex !== "") {
        const alumno = alumnos[alumnoIndex];
        const curso = cursos[cursoIndex].nombre;

        if (!alumno.cursos) {
            alumno.cursos = [];
        }

        // Solo agregar el curso si no está ya asignado
        if (!alumno.cursos.includes(curso)) {
            alumno.cursos.push(curso);
        }

        // Guardar en localStorage
        localStorage.setItem('alumnos', JSON.stringify(alumnos));

        // Mostrar los cursos actualizados
        mostrarCursosDelAlumno(alumnoIndex);
    }
});

cargarSelectAlumnos();
cargarSelectCursos();

// Mostrar cursos al seleccionar un alumno
document.getElementById('alumnoSelect').addEventListener('change', function () {
    const alumnoIndex = this.value;
    if (alumnoIndex !== "") {
        mostrarCursosDelAlumno(alumnoIndex);
    } else {
        document.getElementById('alumnosCursos').innerHTML = '';
    }
});

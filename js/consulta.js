// Obtener estudiantes y cursos desde LocalStorage
let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Cargar los selectores de alumnos y cursos
function cargarSelectores() {
    const alumnoSelect = document.getElementById('estudianteSelect');
    const cursoSelect = document.getElementById('cursoSelect');

    // Limpiar los selectores previos
    alumnoSelect.innerHTML = '<option value="">-- Seleccione un estudiante --</option>';
    cursoSelect.innerHTML = '<option value="">-- Seleccione un curso --</option>';

    // Agregar los alumnos al select
    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = alumno.nombre;
        alumnoSelect.appendChild(option);
    });

    // Agregar los cursos al select
    cursos.forEach((curso, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = curso.nombre;
        cursoSelect.appendChild(option);
    });
}

// Función para eliminar un estudiante de un curso
function eliminarEstudianteDelCurso(alumnoIndex, cursoIndex) {
    const curso = cursos[cursoIndex];
    const alumno = alumnos[alumnoIndex];

    // Filtrar los cursos del alumno y eliminar el curso actual
    alumno.cursos = alumno.cursos.filter(cursoNombre => cursoNombre !== curso.nombre);

    // Actualizar el almacenamiento local
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    // Actualizar la lista mostrada en la página
    const estudiantesInscritos = alumnos.filter(alumno => alumno.cursos && alumno.cursos.includes(curso.nombre));
    mostrarResultados(`Estudiantes inscritos en ${curso.nombre}`, estudiantesInscritos, cursoIndex);
}

// Mostrar estudiantes inscritos en un curso
document.getElementById('verEstudiantesCurso')?.addEventListener('click', function () {
    const cursoIndex = document.getElementById('cursoSelect').value;

    if (cursoIndex !== "") {
        const curso = cursos[cursoIndex];
        const estudiantesInscritos = alumnos.filter(alumno => alumno.cursos && alumno.cursos.includes(curso.nombre));

        mostrarResultados(`Estudiantes inscritos en ${curso.nombre}`, estudiantesInscritos, cursoIndex);
    } else {
        alert('Seleccione un curso.');
    }
});

// Mostrar cursos en los que está inscrito un estudiante
document.getElementById('verCursosEstudiante')?.addEventListener('click', function () {
    const alumnoIndex = document.getElementById('estudianteSelect').value;

    if (alumnoIndex !== "") {
        const alumno = alumnos[alumnoIndex];
        const cursosInscritos = alumno.cursos || [];

        mostrarResultados(`Cursos inscritos por ${alumno.nombre}`, cursosInscritos, null, alumnoIndex);
    } else {
        alert('Seleccione un estudiante.');
    }
});

// Función para mostrar los resultados en la página
function mostrarResultados(titulo, resultados, cursoIndex = null, alumnoIndex = null) {
    const resultadosDiv = document.getElementById('resultadosConsulta');
    resultadosDiv.innerHTML = `<h3>${titulo}</h3>`;

    if (resultados.length > 0) {
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none'; // Quitar los puntos de la lista
        ul.style.padding = '0';
        
        resultados.forEach((res, index) => {
            const li = document.createElement('li');
            li.style.padding = '10px 0';
            li.style.borderBottom = '1px solid #ddd';

            // Mostrar solo el nombre y la edad sin el botón de eliminar
            if (cursoIndex !== null) {
                li.innerHTML = `${res.nombre} (${res.edad} años)`;
            } else {
                li.textContent = typeof res === 'string' ? res : res.nombre + ` (${res.edad} años)`;
            }
            
            ul.appendChild(li);
        });

        resultadosDiv.appendChild(ul);
    } else {
        resultadosDiv.innerHTML += '<p>No se encontraron resultados.</p>';
    }
}


// Cargar los selectores al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarSelectores();
});

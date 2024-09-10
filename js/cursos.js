// Obtener cursos desde LocalStorage o inicializar si no existen
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Función para mostrar los cursos
function mostrarCursos() {
    const cursosList = document.getElementById('cursosList');
    if (cursosList) {
        cursosList.innerHTML = ''; // Limpiar la lista antes de agregar los cursos
        cursos.forEach((curso, index) => {
            cursosList.innerHTML += `
                <div class="item">
                    <span>${curso.nombre}</span>
                    <div class="button-container">
                        <button onclick="editarCurso(${index})">Editar</button>
                        <button onclick="eliminarCurso(${index})">Eliminar</button>
                    </div>
                </div>`;
        });
    }
}

// Agregar o editar curso
document.getElementById('cursoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const nombre = document.getElementById('nombreCurso').value; // Obtener el nombre del curso
    const index = document.getElementById('cursoIndex').value; // Ver si estamos editando o agregando

    if (index === "") {
        // Agregar nuevo curso
        cursos.push({ nombre });
    } else {
        // Editar curso existente
        cursos[index].nombre = nombre;
    }

    // Guardar los cursos en localStorage
    localStorage.setItem('cursos', JSON.stringify(cursos));

    // Mostrar los cursos actualizados
    mostrarCursos();

    // Limpiar formulario y resetear el índice del curso
    document.getElementById('nombreCurso').value = '';
    document.getElementById('cursoIndex').value = '';
    document.getElementById('submitCursoButton').innerText = 'Agregar Curso'; // Restablecer el texto del botón
});

// Eliminar un curso
function eliminarCurso(index) {
    cursos.splice(index, 1); // Eliminar curso del array
    localStorage.setItem('cursos', JSON.stringify(cursos)); // Actualizar en localStorage
    mostrarCursos(); // Volver a mostrar la lista actualizada
}

// Editar un curso
function editarCurso(index) {
    const curso = cursos[index]; // Obtener el curso seleccionado
    document.getElementById('nombreCurso').value = curso.nombre; // Cargar el nombre del curso en el formulario
    document.getElementById('cursoIndex').value = index; // Establecer el índice del curso en el campo oculto
    document.getElementById('submitCursoButton').innerText = 'Guardar'; // Cambiar el texto del botón a "Guardar"
}

// Mostrar los cursos cuando se carga la página
mostrarCursos();

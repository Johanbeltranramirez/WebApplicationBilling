document.addEventListener('DOMContentLoaded', function () {
    // Llamar a la función para cargar los proveedores cuando la página esté completamente cargada
    loadProveedores();
});

function loadProveedores() {
    fetch('/Proveedores/GetAll') // Asegúrate de reemplazar con la ruta correcta
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderProveedores(data.data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Aquí podrías mostrar un mensaje de error en la vista, si lo deseas
        });
}

function renderProveedores(Proveedores) {
    const container = document.getElementById('ProveedoresContainer');
    container.innerHTML = ''; // Limpia el contenedor

    // Crear la tabla y su cabecera
    const table = document.createElement('table');
    table.className = 'Proveedor-table'; // Agrega una clase para estilos
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre de la Compañía</th>
            <th>Nombre de Contacto</th>
            <th>Título de Contacto</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Teléfono</th>
            <th>Email</th>
        </tr>`;
    table.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    Proveedores.forEach(Proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Proveedor.id}</td>
            <td>${escapeHtml(Proveedor.nombreCompania)}</td>
            <td>${escapeHtml(Proveedor.nombreContacto)}</td>
            <td>${escapeHtml(Proveedor.tituloContacto)}</td>
            <td>${escapeHtml(Proveedor.ciudad)}</td>
            <td>${escapeHtml(Proveedor.pais)}</td>
            <td>${escapeHtml(Proveedor.telefono)}</td>
            <td>${Proveedor.email ? escapeHtml(Proveedor.email) : ''}</td>`;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Agregar la tabla al contenedor
    container.appendChild(table);
}

function escapeHtml(text) {
    // Función para prevenir inyección de HTML
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

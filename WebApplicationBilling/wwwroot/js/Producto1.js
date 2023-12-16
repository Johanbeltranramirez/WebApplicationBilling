document.addEventListener('DOMContentLoaded', function () {
    // Llamar a la función para cargar los productos cuando la página esté completamente cargada
    loadProductos();
});

function loadProductos() {
    fetch('/Productos/GetAll') // Asegúrate de reemplazar con la ruta correcta
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderProductos(data.data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Aquí podrías mostrar un mensaje de error en la vista, si lo deseas
        });
}

function renderProductos(Productos) {
    const container = document.getElementById('ProductosContainer');
    container.innerHTML = ''; // Limpia el contenedor

    // Crear la tabla y su cabecera
    const table = document.createElement('table');
    table.className = 'Producto-table'; // Agrega una clase para estilos
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>ID del Proveedor</th>
            <th>Precio Unitario</th>
            <th>Paquete</th>
            <th>Descontinuado</th>
        </tr>`;
    table.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    Productos.forEach(Producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Producto.id}</td>
            <td>${escapeHtml(Producto.nombreProducto)}</td>
            <td>${Producto.proveedorId}</td>
            <td>${Producto.unitPrecio}</td>
            <td>${escapeHtml(Producto.paquete)}</td>
            <td>${Producto.esDescontinuado}</td>`;
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

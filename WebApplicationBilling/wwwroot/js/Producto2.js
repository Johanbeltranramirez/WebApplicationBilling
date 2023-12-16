document.addEventListener('DOMContentLoaded', function () {
    loadProductos();
});

function loadProductos() {
    fetch('/Productos/GetAllProductos') // Aseg�rate de reemplazar con la ruta correcta
        .then(response => response.json())
        .then(data => {
            initializeDataTable(data.data);
        })
        .catch(error => console.error('Error:', error));
}

function initializeDataTable(productos) {
    let table = document.getElementById('ProductosTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'ProductosTable';
        table.className = 'display'; // Clase necesaria para DataTables
        document.getElementById('ProductosContainer').appendChild(table);
    }

    $(table).DataTable({
        responsive: true,
        data: productos,
        columns: [
            { title: "ID", data: "id", className: "column-id" },
            { title: "Nombre del Producto", data: "nombreProducto", className: "column-name" },
            { title: "Proveedor ID", data: "proveedorId", className: "column-name" },
            { title: "Precio Unitario", data: "unitPrecio", className: "column-name" },
            { title: "Paquete", data: "paquete", className: "column-name" },
            { title: "Descontinuado", data: "esDescontinuado", className: "column-name" },
            {
                title: "Acciones",
                data: "id",
                render: function (data) {
                    return `<div class="text-center">
                                <a href="/Productos/Detail/${data}" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                <a href="/Productos/Edit/${data}" class="btn btn-secondary"><i class="fa fa-edit"></i></a>
                                <a onclick="Delete('/Productos/Delete/${data}')" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                            </div>`;
                },
                className: "column-actions"
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: "�Est� seguro de querer borrar el registro?",
        text: "�Esta acci�n no puede ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S�, b�rralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (response) {
                    if (response && response.success) {
                        toastr.success(response.message || "Registro eliminado con �xito.");
                        // Recargar DataTables
                        $('#ProductosTable').DataTable().clear().destroy();
                        loadProductos();
                    } else {
                        toastr.error(response.message || "Ocurri� un error desconocido.");
                    }
                },
                error: function (error) {
                    toastr.error("Error al intentar eliminar el registro.");
                    console.error('Error:', error);
                }
            });
        }
    });
}

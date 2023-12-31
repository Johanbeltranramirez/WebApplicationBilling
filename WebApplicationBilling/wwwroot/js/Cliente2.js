﻿document.addEventListener('DOMContentLoaded', function () {
    loadClientes();
});

function loadClientes() {
    fetch('/Clientes/GetAllClientes') // Asegúrate de reemplazar con la ruta correcta
        .then(response => response.json())
        .then(data => {
            initializeDataTable(data.data);
        })
        .catch(error => console.error('Error:', error));
}


function initializeDataTable(Clientes) {
    let table = document.getElementById('ClientesTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'ClientesTable';
        table.className = 'display'; // Clase necesaria para DataTables
        document.getElementById('ClientesContainer').appendChild(table);
    }

    $(table).DataTable({
        responsive: true,
        data: Clientes,
        columns: [
            { title: "ID", data: "id", className: "column-id" },
            { title: "Nombre", data: "primerNombre", className: "column-name" },
            { title: "Apellido", data: "apellido", className: "column-name" },
            { title: "País", data: "pais", className: "column-pais" },
            { title: "Teléfono", data: "telefono", className: "column-telefono" },
            {
                title: "Acciones",
                data: "id",
                render: function (data) {
                    return `<div class="text-center">
                                <a href="/Clientes/Detail/${data}" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                <a href="/Clientes/Edit/${data}" class="btn btn-secondary"><i class="fa fa-edit"></i></a>
                                <a onclick="Delete('/Clientes/Delete/${data}')" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                            </div>`;
                },
                className: "column-actions"
            }
        ]
    });
}


function Delete(url) {
    Swal.fire({
        title: "¿Está seguro de querer borrar el registro?",
        text: "¡Esta acción no puede ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (response) {
                    if (response && response.success) {
                        toastr.success(response.message || "Registro eliminado con éxito.");
                        // Recargar DataTables
                        $('#ClientesTable').DataTable().clear().destroy();
                        loadClientes();
                    } else {
                        toastr.error(response.message || "Ocurrió un error desconocido.");
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
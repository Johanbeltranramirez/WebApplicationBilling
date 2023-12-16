document.addEventListener('DOMContentLoaded', function () {
    loadProveedores();
});

function loadProveedores() {
    fetch('/Proveedores/GetAllProveedores') // Aseg�rate de reemplazar con la ruta correcta
        .then(response => response.json())
        .then(data => {
            initializeDataTable(data.data);
        })
        .catch(error => console.error('Error:', error));
}

function initializeDataTable(proveedores) {
    let table = document.getElementById('ProveedoresTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'ProveedoresTable';
        table.className = 'display'; // Clase necesaria para DataTables
        document.getElementById('ProveedoresContainer').appendChild(table);
    }

    $(table).DataTable({
        responsive: true,
        data: proveedores,
        columns: [
            { title: "ID", data: "id", className: "column-id" },
            { title: "Nombre de la Compa��a", data: "nombreCompania", className: "column-name" },
            { title: "Nombre de Contacto", data: "nombreContacto", className: "column-name" },
            { title: "T�tulo de Contacto", data: "tituloContacto", className: "column-name" },
            { title: "Ciudad", data: "ciudad", className: "column-name" },
            { title: "Pa�s", data: "pais", className: "column-name" },
            { title: "Tel�fono", data: "telefono", className: "column-name" },
            { title: "Email", data: "email", className: "column-name" },
            {
                title: "Acciones",
                data: "id",
                render: function (data) {
                    return `<div class="text-center">
                                <a href="/Proveedores/Detail/${data}" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                <a href="/Proveedores/Edit/${data}" class="btn btn-secondary"><i class="fa fa-edit"></i></a>
                                <a onclick="Delete('/Proveedores/Delete/${data}')" class="btn btn-danger"><i class="fa fa-trash"></i></a>
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
                        $('#ProveedoresTable').DataTable().clear().destroy();
                        loadProveedores();
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

$(document).ready(function () {
    loadProveedoresDataTable();
});

function loadProveedoresDataTable() {
    dataTable = $('#tblProveedores').DataTable({
        "ajax": {
            "url": "/Proveedores/GetAll", 
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "id", "width": "10%" },
            { "data": "nombreCompania", "width": "20%" },
            { "data": "nombreContacto", "width": "20%" },
            { "data": "tituloContacto", "width": "20%" },
            { "data": "ciudad", "width": "10%" },
            { "data": "pais", "width": "10%" },
            { "data": "telefono", "width": "10%" },
            { "data": "email", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Proveedores/Detail/${data}" class="btn btn-primary text-white" style="cursor:pointer;">Ver</a>
                                <a href="/Proveedores/Edit/${data}" class="btn btn-success text-white" style="cursor:pointer;">Editar</a>
                                <a onclick="Delete('/Proveedores/Delete/${data}')" class="btn btn-danger text-white" style="cursor:pointer;">Borrar</a>
                            </div>`;
                }, "width": "20%"
            }
        ],
        "language": {
            "emptyTable": "No hay datos disponibles"
        }
    });
}

function Delete(url) {
    swal({
        title: "¿Está seguro de querer borrar el registro?",
        text: "Esta acción no puede ser revertida",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}

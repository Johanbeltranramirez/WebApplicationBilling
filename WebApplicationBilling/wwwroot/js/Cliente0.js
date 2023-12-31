﻿$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblClientes').DataTable({
        "ajax": {
            "url": "/Clientes/GetAll", 
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "id", "width": "10%" },
            { "data": "primerNombre", "width": "20%" },
            { "data": "apellido", "width": "20%" },
            { "data": "pais", "width": "20%" },
            { "data": "telefono", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Clientes/Detail/${data}" class="btn btn-primary text-white" style="cursor:pointer;">Ver</a>
                                <a href="/Clientes/Edit/${data}" class="btn btn-success text-white" style="cursor:pointer;">Editar</a>
                                <a onclick="Delete('/Clientes/Delete/${data}')" class="btn btn-danger text-white" style="cursor:pointer;">Borrar</a>
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
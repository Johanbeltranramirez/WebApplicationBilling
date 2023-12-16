$(document).ready(function () {
    loadProductosDataTable();
});

function loadProductosDataTable() {
    dataTable = $('#tblProductos').DataTable({
        "ajax": {
            "url": "/Productos/GetAll", 
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "id", "width": "10%" },
            { "data": "nombreProducto", "width": "20%" },
            { "data": "proveedorId", "width": "20%" },
            { "data": "unitPrecio", "width": "20%" },
            { "data": "paquete", "width": "10%" },
            { "data": "esDescontinuado", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Productos/Detail/${data}" class="btn btn-primary text-white" style="cursor:pointer;">Ver</a>
                                <a href="/Productos/Edit/${data}" class="btn btn-success text-white" style="cursor:pointer;">Editar</a>
                                <a onclick="Delete('/Productos/Delete/${data}')" class="btn btn-danger text-white" style="cursor:pointer;">Borrar</a>
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

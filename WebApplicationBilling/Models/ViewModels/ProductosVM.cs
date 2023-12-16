using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplicationBilling.Models.DTO;

namespace WebApplicationBilling.Models.ViewModels
{
    public class ProductosVM
    {
        public IEnumerable<SelectListItem> ListProductos { get; set; }
        public ProductoDTO Producto { get; set; }
    }
}

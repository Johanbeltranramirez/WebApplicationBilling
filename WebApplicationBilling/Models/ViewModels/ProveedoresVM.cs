using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplicationBilling.Models.DTO;

namespace WebApplicationBilling.Models.ViewModels
{
    public class ProveedoresVM
    {
        public IEnumerable<SelectListItem> ListProveedores { get; set; }
        public ProductoDTO Proveedor { get; set; }
    }
}

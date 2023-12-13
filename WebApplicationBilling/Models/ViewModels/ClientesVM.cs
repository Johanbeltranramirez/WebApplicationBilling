using Microsoft.AspNetCore.Mvc.Rendering;
using WebApplicationBilling.Models.DTO;

namespace WebApplicationBilling.Models.ViewModels
{
    public class ClientesVM
    {
        public IEnumerable<SelectListItem> ListClientes { get; set; }
        public ClienteDTO Cliente { get; set; }

    }
}


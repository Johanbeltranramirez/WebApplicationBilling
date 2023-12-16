using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Core;
using WebApplicationBilling.Models.DTO;
using WebApplicationBilling.Repository.Interfaces;
using WebApplicationBilling.Utilities;

namespace WebApplicationBilling.Controllers
{
    public class ClientesController : Controller
    {
        private readonly IClienteRepository _clienteRepository;


        public ClientesController(IClienteRepository ClienteRepository)
        {
            this._clienteRepository = ClienteRepository;
        }

        [HttpGet]
        // GET: ClientesController
        public ActionResult Index()
        {
            return View(new ClienteDTO() { });
        }


        public async Task<IActionResult> GetAllClientes()
        {
            try
            {
                //Llama al repositorio
                var data = await _clienteRepository.GetAllAsync(UrlResources.UrlBase + UrlResources.UrlClientes);
                
                return Json(new { data });
            }
            catch (Exception ex)
            {
                // Log the exception, handle it, or return an error message as needed
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        // GET: ClientesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClientesController/Create
        //Renderiza la vista
        public ActionResult Create()
        {
            return View();
        }

        // POST: ClientesController/Create
        //Captura los datos y los lleva hacia el endpointpasando por el repositorio --> Nube--> DB
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ClienteDTO Cliente)
        {
            try
            {
                await _clienteRepository.PostAsync(UrlResources.UrlBase + UrlResources.UrlClientes, Cliente);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ClientesController/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {

            var Cliente = new ClienteDTO();

            Cliente = await _clienteRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlClientes, id.GetValueOrDefault());
            if (Cliente == null)
            {
                return NotFound();
            }
            return View(Cliente);
        }

        // POST: ClientesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ClienteDTO Cliente)
        {
            if (ModelState.IsValid)
            {
                await _clienteRepository.UpdateAsync(UrlResources.UrlBase + UrlResources.UrlClientes + Cliente.id, Cliente);
                return RedirectToAction(nameof(Index));
            }

            return View();
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var Cliente = await _clienteRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlClientes, id);
            if (Cliente == null)
            {
                return Json(new { success = false, message = "Cliente no ha sido encontrado." });
            }

            var deleteResult = await _clienteRepository.DeleteAsync(UrlResources.UrlBase + UrlResources.UrlClientes, id);
            if (deleteResult)
            {
                return Json(new { success = true, message = "Cliente eliminado correctamente." });
            }
            else
            {
                return Json(new { success = false, message = "Error al eliminar el cliente." });
            }
        }


    }
}
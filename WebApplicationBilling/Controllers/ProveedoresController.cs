using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Core;
using WebApplicationBilling.Models.DTO;
using WebApplicationBilling.Repository.Interfaces;
using WebApplicationBilling.Utilities;

namespace WebApplicationBilling.Controllers
{
    public class ProveedoresController : Controller
    {
        private readonly IProveedorRepository _proveedorRepository;

        public ProveedoresController(IProveedorRepository proveedorRepository)
        {
            this._proveedorRepository = proveedorRepository;
        }

        [HttpGet]
        // GET: ProveedoresController
        public ActionResult Index()
        {
            return View(new ProveedorDTO());
        }

        public async Task<IActionResult> GetAllProveedores()
        {
            try
            {
                var data = await _proveedorRepository.GetAllAsync(UrlResources.UrlBase + UrlResources.UrlProveedores);
                return Json(new { data });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        // GET: ProveedoresController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ProveedoresController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProveedoresController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProveedorDTO proveedor)
        {
            try
            {
                await _proveedorRepository.PostAsync(UrlResources.UrlBase + UrlResources.UrlProveedores, proveedor);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProveedoresController/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            var proveedor = new ProveedorDTO();
            proveedor = await _proveedorRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlProveedores, id.GetValueOrDefault());

            if (proveedor == null)
            {
                return NotFound();
            }

            return View(proveedor);
        }

        // POST: ProveedoresController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ProveedorDTO proveedor)
        {
            if (ModelState.IsValid)
            {
                await _proveedorRepository.UpdateAsync(UrlResources.UrlBase + UrlResources.UrlProveedores + proveedor.id, proveedor);
                return RedirectToAction(nameof(Index));
            }

            return View();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var proveedor = await _proveedorRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlProveedores, id);

            if (proveedor == null)
            {
                return Json(new { success = false, message = "Proveedor no ha sido encontrado." });
            }

            var deleteResult = await _proveedorRepository.DeleteAsync(UrlResources.UrlBase + UrlResources.UrlProveedores, id);

            if (deleteResult)
            {
                return Json(new { success = true, message = "Proveedor eliminado correctamente." });
            }
            else
            {
                return Json(new { success = false, message = "Error al eliminar el proveedor." });
            }
        }
    }
}
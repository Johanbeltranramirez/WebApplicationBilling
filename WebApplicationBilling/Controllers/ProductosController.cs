using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApplicationBilling.Models.DTO;
using WebApplicationBilling.Repository.Interfaces;
using WebApplicationBilling.Utilities;

namespace WebApplicationBilling.Controllers
{
    public class ProductosController : Controller
    {
        private readonly IProductoRepository _productoRepository;

        public ProductosController(IProductoRepository productoRepository)
        {
            this._productoRepository = productoRepository;
        }

        [HttpGet]
        // GET: ProductosController
        public ActionResult Index()
        {
            return View(new ProductoDTO());
        }

        public async Task<IActionResult> GetAllProductos()
        {
            try
            {
                var data = await _productoRepository.GetAllAsync(UrlResources.UrlBase + UrlResources.UrlProductos);
                return Json(new { data });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        // GET: ProductosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ProductosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProductosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductoDTO producto)
        {
            try
            {
                await _productoRepository.PostAsync(UrlResources.UrlBase + UrlResources.UrlProductos, producto);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductosController/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            var producto = new ProductoDTO();
            producto = await _productoRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlProductos, id.GetValueOrDefault());

            if (producto == null)
            {
                return NotFound();
            }

            return View(producto);
        }

        // POST: ProductosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ProductoDTO producto)
        {
            if (ModelState.IsValid)
            {
                await _productoRepository.UpdateAsync(UrlResources.UrlBase + UrlResources.UrlProductos + producto.id, producto);
                return RedirectToAction(nameof(Index));
            }

            return View();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var producto = await _productoRepository.GetByIdAsync(UrlResources.UrlBase + UrlResources.UrlProductos, id);

            if (producto == null)
            {
                return Json(new { success = false, message = "Producto no ha sido encontrado." });
            }

            var deleteResult = await _productoRepository.DeleteAsync(UrlResources.UrlBase + UrlResources.UrlProductos, id);

            if (deleteResult)
            {
                return Json(new { success = true, message = "Producto eliminado correctamente." });
            }
            else
            {
                return Json(new { success = false, message = "Error al eliminar el producto." });
            }
        }
    }
}

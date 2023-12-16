namespace WebApplicationBilling.Models.DTO
{
    public class ProductoDTO
    {
        public int id { get; set; }
        public string nombreProducto { get; set; }
        public int proveedorId { get; set; }
        public decimal unitPrecio { get; set; } = 0;
        public string paquete { get; set; }
        public bool esDescontinuado { get; set; } = false;
    }
}

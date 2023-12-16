namespace WebApplicationBilling.Models.DTO
{
    public class ProveedorDTO
    {
        public int id { get; set; }
        public string nombreCompania { get; set; }
        public string nombreContacto { get; set; }
        public string tituloContacto { get; set; }
        public string ciudad { get; set; }
        public string pais { get; set; }
        public string telefono { get; set; }
        public string? email { get; set; }
    }
}

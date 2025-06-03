using System.Text.Json.Serialization;

namespace Sinqia.Api.Models
{
    public class Cidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int EstadoId { get; set; }
        public Estado Estado { get; set; }

        [JsonIgnore]
        public ICollection<PontoTuristico> PontosTuristicos { get; set; }
    }

}
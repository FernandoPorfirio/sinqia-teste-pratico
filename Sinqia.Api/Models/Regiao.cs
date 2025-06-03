using System.Text.Json.Serialization;

namespace Sinqia.Api.Models
{
    public class Regiao
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        [JsonIgnore]
        public ICollection<Estado> Estados { get; set; }
    }
}
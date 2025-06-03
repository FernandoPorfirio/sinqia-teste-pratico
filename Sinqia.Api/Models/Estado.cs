using System.Text.Json.Serialization;

namespace Sinqia.Api.Models
{
    public class Estado
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }
        public int RegiaoId { get; set; }

        [JsonIgnore]
        public Regiao Regiao { get; set; }

        [JsonIgnore]
        public ICollection<Cidade> Cidades { get; set; }
    }
}
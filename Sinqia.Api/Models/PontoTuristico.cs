using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Sinqia.Api.Models
{
    public class PontoTuristico
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Campo Nome deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Campo Descrição deve ter no máximo 100 caracteres.")]
        public string Descricao { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Campo Localização deve ter no máximo 100 caracteres.")]
        public string Localizacao { get; set; }

        [Required]
        public int CidadeId { get; set; }

        [JsonIgnore]
        public Cidade Cidade { get; set; }

        [Required]
        public DateTime DataCriacao { get; set; }

        public PontoTuristico()
        {
            DataCriacao = DateTime.Now;
        }
    }
}
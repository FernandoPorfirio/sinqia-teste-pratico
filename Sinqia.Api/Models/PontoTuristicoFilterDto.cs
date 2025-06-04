namespace Sinqia.Api.Models.Dtos
{
    public class PontoTuristicoFilterDto
    {
        public string? Search { get; set; }
        public int? RegiaoId { get; set; }
        public int? EstadoId { get; set; }
        public int? CidadeId { get; set; }
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 10;
    }
}
public class PontoTuristico
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Localizacao { get; set; }
    public int CidadeId { get; set; }
    public Cidade Cidade { get; set; }
    public DateTime DataCriacao { get; set; }
}

public class Estado
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Sigla { get; set; }
    public int RegiaoId { get; set; }
    public Regiao Regiao { get; set; }
    public ICollection<Cidade> Cidades { get; set; }
}

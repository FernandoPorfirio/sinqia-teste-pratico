public class Regiao
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public ICollection<Estado> Estados { get; set; }
}

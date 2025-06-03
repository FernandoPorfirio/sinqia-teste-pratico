using System.Text.Json;
using Sinqia.Api.Data;
using Sinqia.Api.Models;

public static class SeedService
{
    public static void SeedData(DataContext  context)
    {
        if (!context.Regioes.Any()) {
            var jsonPath = Path.Combine("Data", "Seeds", "regioes_estados_cidades.json");
            var json = File.ReadAllText(jsonPath);
            var regioes = JsonSerializer.Deserialize<List<RegiaoInput>>(json);

            foreach (var regiaoInput in regioes)
            {
                var regiao = new Regiao { Nome = regiaoInput.nome, Estados = new List<Estado>() };
                foreach (var estadoInput in regiaoInput.estados)
                {
                    var estado = new Estado
                    {
                        Nome = estadoInput.nome,
                        Sigla = estadoInput.sigla,
                        Cidades = new List<Cidade>()
                    };
                    foreach (var cidadeInput in estadoInput.cidades)
                    {
                        estado.Cidades.Add(new Cidade { Nome = cidadeInput.nome });
                    }
                    regiao.Estados.Add(estado);
                }
                context.Regioes.Add(regiao);
            }
            context.SaveChanges();
        }
    }
}

// Classes auxiliares para desserializar JSON
public class RegiaoInput
{
    public string nome { get; set; }
    public List<EstadoInput> estados { get; set; }
}

public class EstadoInput
{
    public string nome { get; set; }
    public string sigla { get; set; }
    public List<CidadeInput> cidades { get; set; }
}

public class CidadeInput
{
    public string nome { get; set; }
}
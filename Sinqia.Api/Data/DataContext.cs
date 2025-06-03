using Microsoft.EntityFrameworkCore;
using Sinqia.Api.Models;

namespace Sinqia.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Regiao> Regioes { get; set; }
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Cidade> Cidades { get; set; }
        public DbSet<PontoTuristico> PontosTuristicos { get; set; }
    }
}
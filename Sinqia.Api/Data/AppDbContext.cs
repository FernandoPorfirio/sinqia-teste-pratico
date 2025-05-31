using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Estado> Estados { get; set; }
    public DbSet<Cidade> Cidades { get; set; }
    public DbSet<PontoTuristico> PontosTuristicos { get; set; }
}

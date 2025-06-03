using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Sinqia.Api.Data;
using Sinqia.Api.Models;

namespace Sinqia.Api.Controllers
{
    [Route("api/PontoTuristico")]
    public class PontoTuristicoController : ControllerBase
    {
        private readonly DataContext _context;

        public PontoTuristicoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("search/{search}/page/{page}/limit/{limit}")]
        [HttpGet("Regiao/{regiaoId}/search/{search}/page/{page}/limit/{limit}")]
        [HttpGet("Regiao/{regiaoId}/Estado/{estadoId}/search/{search}/page/{page}/limit/{limit}")]
        [HttpGet("Regiao/{regiaoId}/Estado/{estadoId}/Cidade/{cidadeId}/search/{search}/page/{page}/limit/{limit}")]
        public async Task<ActionResult<IEnumerable<PontoTuristico>>> GetPontosTuristicos(
            string search,
            int page,
            int limit,
            int? regiaoId = null,
            int? estadoId = null,
            int? cidadeId = null)
        {
            if (page < 1 || limit < 1)
                return BadRequest("Page and limit must be greater than 0.");

            var query = _context.PontosTuristicos
                .Include(p => p.Cidade)
                    .ThenInclude(c => c.Estado)
                        .ThenInclude(e => e.Regiao)
                .AsQueryable();

            if (regiaoId.HasValue)
                query = query.Where(p => p.Cidade.Estado.Id == regiaoId);

            if (estadoId.HasValue)
                query = query.Where(p => p.Cidade.Id == estadoId);

            if (cidadeId.HasValue)
                query = query.Where(p => p.Id == cidadeId);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(p =>
                    p.Nome.ToLower().Contains(searchLower) ||
                    p.Descricao.ToLower().Contains(searchLower) ||
                    p.Cidade.Nome.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Nome.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Sigla.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Regiao.Nome.ToLower().Contains(searchLower)
                );
            }

            var sql = query.ToQueryString();
            Console.WriteLine(sql);

            var total = await query.CountAsync();
            var pontos = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                Total = total,
                Page = page,
                Limit = limit,
                Data = pontos
            });
        }

        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> CreatePontoTuristico([FromBody] PontoTuristico ponto)
        {
            if (ponto == null)
                return BadRequest("Dados inválidos.");

            if (string.IsNullOrWhiteSpace(ponto.Nome))
                return BadRequest("Nome é obrigatório.");

            if (ponto.Nome.Length > 100)
                return BadRequest("Campo Nome deve ter no máximo 100 caracteres.");

            if (string.IsNullOrWhiteSpace(ponto.Descricao))
                return BadRequest("Descrição é obrigatória.");

            if (ponto.Descricao.Length > 100)
                return BadRequest("Campo Descrição deve ter no máximo 100 caracteres.");

            if (string.IsNullOrWhiteSpace(ponto.Localizacao))
                return BadRequest("Localização é obrigatória.");

            if (ponto.Localizacao.Length > 100)
                return BadRequest("Campo Localização deve ter no máximo 100 caracteres.");

            if (ponto.CidadeId <= 0)
                return BadRequest("CidadeId é obrigatório.");

            _context.PontosTuristicos.Add(ponto);
            await _context.SaveChangesAsync();

            return Ok(ponto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePontoTuristico(int id, [FromBody] PontoTuristico ponto)
        {
            if (id != ponto.Id)
                return BadRequest("Id do parâmetro e do corpo não coincidem.");

            if (string.IsNullOrWhiteSpace(ponto.Nome))
                return BadRequest("Nome é obrigatório.");
            if (ponto.Nome.Length > 100)
                return BadRequest("Campo Nome deve ter no máximo 100 caracteres.");

            if (string.IsNullOrWhiteSpace(ponto.Descricao))
                return BadRequest("Descrição é obrigatória.");
            if (ponto.Descricao.Length > 100)
                return BadRequest("Campo Descrição deve ter no máximo 100 caracteres.");

            if (string.IsNullOrWhiteSpace(ponto.Localizacao))
                return BadRequest("Localização é obrigatória.");
            if (ponto.Localizacao.Length > 100)
                return BadRequest("Campo Localização deve ter no máximo 100 caracteres.");

            if (ponto.CidadeId <= 0)
                return BadRequest("CidadeId é obrigatório.");

            var existente = await _context.PontosTuristicos.FindAsync(id);
            if (existente == null)
                return NotFound(new { message = "Ponto turístico não encontrado." });

            existente.Nome = ponto.Nome;
            existente.Descricao = ponto.Descricao;
            existente.Localizacao = ponto.Localizacao;
            existente.CidadeId = ponto.CidadeId;

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePontoTuristico(int id)
        {
            var ponto = await _context.PontosTuristicos.FindAsync(id);
            if (ponto == null)
                return NotFound(new { message = "Ponto turístico não encontrado." });

            _context.PontosTuristicos.Remove(ponto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
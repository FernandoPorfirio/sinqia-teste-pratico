using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Sinqia.Api.Data;
using Sinqia.Api.Models;
using Sinqia.Api.Models.Dtos;

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

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PontoTuristico>>> GetPontosTuristicos([FromQuery] PontoTuristicoFilterDto filters)
        {
            if (filters.Page < 1 || filters.Limit < 1)
                return BadRequest("Page and limit must be greater than 0.");

            var query = _context.PontosTuristicos
                .Include(p => p.Cidade)
                    .ThenInclude(c => c.Estado)
                        .ThenInclude(e => e.Regiao)
                .AsQueryable();

            if (filters.RegiaoId.HasValue)
                query = query.Where(p => p.Cidade.Estado.Regiao.Id == filters.RegiaoId);

            if (filters.EstadoId.HasValue)
                query = query.Where(p => p.Cidade.Estado.Id == filters.EstadoId);

            if (filters.CidadeId.HasValue)
                query = query.Where(p => p.Cidade.Id == filters.CidadeId);

            if (!string.IsNullOrWhiteSpace(filters.Search))
            {
                var searchLower = filters.Search.ToLower();
                query = query.Where(p =>
                    p.Nome.ToLower().Contains(searchLower) ||
                    p.Descricao.ToLower().Contains(searchLower) ||
                    p.Cidade.Nome.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Nome.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Sigla.ToLower().Contains(searchLower) ||
                    p.Cidade.Estado.Regiao.Nome.ToLower().Contains(searchLower)
                );
            }

            query = query.OrderByDescending(p => p.DataCriacao);

            var total = await query.CountAsync();

            var pontos = await query
                .Skip((filters.Page - 1) * filters.Limit)
                .Take(filters.Limit)
                .Select(p => new
                {
                    id = p.Id,
                    nome = p.Nome,
                    descricao = p.Descricao,
                    localizacao = p.Localizacao,
                    dataCriacao = p.DataCriacao,
                    cidadeId = p.CidadeId,
                    cidade = new
                    {
                        id = p.Cidade.Id,
                        nome = p.Cidade.Nome,
                        estadoId = p.Cidade.Estado.Id,
                        estado = new
                        {
                            id = p.Cidade.Estado.Id,
                            nome = p.Cidade.Estado.Nome,
                            sigla = p.Cidade.Estado.Sigla,
                            regiaoId = p.Cidade.Estado.Regiao.Id,
                            regiao = new
                            {
                                id = p.Cidade.Estado.Regiao.Id,
                                nome = p.Cidade.Estado.Regiao.Nome
                            }
                        }
                    }
                })
                .ToListAsync();

            return Ok(new
            {
                Total = total,
                Page = filters.Page,
                Limit = filters.Limit,
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
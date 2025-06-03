using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sinqia.Api.Data;
using Sinqia.Api.Models;

namespace Sinqia.Api.Controllers
{
    [Route("api/Cidade")]
    public class CidadeController : ControllerBase
    {
        private readonly DataContext _context;

        public CidadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("Estado/{estadoId}")]
        public async Task<ActionResult<IEnumerable<Cidade>>> GetCidadesByEstado(int estadoId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cidades = await _context.Cidades
                .Where(c => c.EstadoId == estadoId)
                .ToListAsync();

            return Ok(cidades);
        }
    }
}
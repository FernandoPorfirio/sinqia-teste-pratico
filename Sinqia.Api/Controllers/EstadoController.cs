using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sinqia.Api.Data;
using Sinqia.Api.Models;

namespace Sinqia.Api.Controllers
{
    [Route("api/Estado")]
    public class EstadoController : ControllerBase
    {
        private readonly DataContext _context;

        public EstadoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estado>>> GetEstados()
        {
            var estados = await _context.Estados.ToListAsync();
            return Ok(estados);
        }

        [HttpGet("Regiao/{regiaoId}")]
        public async Task<ActionResult<IEnumerable<Estado>>> GetEstadosByRegiao(int regiaoId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estados = await _context.Estados
                .Where(e => e.RegiaoId == regiaoId)
                .ToListAsync();
            return Ok(estados);
        }
    }
}
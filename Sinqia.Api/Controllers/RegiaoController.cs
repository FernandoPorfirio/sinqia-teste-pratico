using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sinqia.Api.Models;
using Sinqia.Api.Data;

namespace Sinqia.Api.Controllers
{
    [Route("api/[controller]")]
    public class RegiaoController : ControllerBase
    {
        private readonly DataContext _context;

        public RegiaoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Regiao>>> GetRegioes()
        {
            var regioes = await _context.Regioes.ToListAsync();
            return Ok(regioes);
        }
    }
}
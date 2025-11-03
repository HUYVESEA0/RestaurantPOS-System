using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Data;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

      public TablesController(ApplicationDbContext context)
        {
  _context = context;
        }

        // GET: api/Tables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Table>>> GetTables()
        {
            return await _context.Tables.ToListAsync();
   }

        // GET: api/Tables/5
  [HttpGet("{id}")]
        public async Task<ActionResult<Table>> GetTable(int id)
        {
   var table = await _context.Tables.FindAsync(id);

       if (table == null)
            {
           return NotFound();
            }

        return table;
        }

        // GET: api/Tables/Available
        [HttpGet("Available")]
        public async Task<ActionResult<IEnumerable<Table>>> GetAvailableTables()
     {
    return await _context.Tables.Where(t => t.IsAvailable).ToListAsync();
        }

    // POST: api/Tables
        [HttpPost]
    public async Task<ActionResult<Table>> CreateTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();

       return CreatedAtAction(nameof(GetTable), new { id = table.Id }, table);
    }

        // PUT: api/Tables/5
   [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTable(int id, Table table)
        {
            if (id != table.Id)
            {
         return BadRequest();
     }

            _context.Entry(table).State = EntityState.Modified;

  try
    {
      await _context.SaveChangesAsync();
            }
        catch (DbUpdateConcurrencyException)
            {
           if (!TableExists(id))
       {
         return NotFound();
           }
       else
    {
   throw;
       }
      }

    return NoContent();
        }

      // PATCH: api/Tables/5/Availability
      [HttpPatch("{id}/Availability")]
        public async Task<IActionResult> UpdateTableAvailability(int id, [FromBody] bool isAvailable)
        {
       var table = await _context.Tables.FindAsync(id);
            if (table == null)
          {
         return NotFound();
            }

            table.IsAvailable = isAvailable;
     await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Tables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(int id)
      {
var table = await _context.Tables.FindAsync(id);
            if (table == null)
      {
    return NotFound();
            }

         _context.Tables.Remove(table);
         await _context.SaveChangesAsync();

   return NoContent();
     }

        private bool TableExists(int id)
        {
  return _context.Tables.Any(e => e.Id == id);
        }
    }
}

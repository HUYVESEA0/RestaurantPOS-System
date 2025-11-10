using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Data;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
      _context = context;
        }

        // GET: api/Categories
      [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
     {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
      public async Task<ActionResult<Category>> GetCategory(int id)
        {
      var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
             return NotFound();
        }

         return category;
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            _context.Categories.Add(category);
     await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
      if (id != category.Id)
      {
     return BadRequest();
}

 _context.Entry(category).State = EntityState.Modified;

  try
       {
 await _context.SaveChangesAsync();
     }
         catch (DbUpdateConcurrencyException)
            {
    if (!CategoryExists(id))
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

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
      var category = await _context.Categories.FindAsync(id);
        if (category == null)
    {
 return NotFound();
 }

        _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

         return NoContent();
        }

        private bool CategoryExists(int id)
        {
     return _context.Categories.Any(e => e.Id == id);
        }
    }
}

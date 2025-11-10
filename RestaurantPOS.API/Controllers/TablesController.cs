using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Data;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication for all endpoints
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

        // POST: api/Tables/Merge - Merge multiple tables
        [HttpPost("Merge")]
        public async Task<ActionResult<MergeTablesResponse>> MergeTables([FromBody] MergeTablesRequest request)
        {
            if (request.TableIds == null || request.TableIds.Count < 2)
            {
                return BadRequest("Cần ít nhất 2 bàn để ghép");
            }

            var tables = await _context.Tables
                .Where(t => request.TableIds.Contains(t.Id))
                .ToListAsync();

            if (tables.Count != request.TableIds.Count)
            {
                return NotFound("Một số bàn không tồn tại");
            }

            // Check if all tables are available
            if (tables.Any(t => !t.IsAvailable))
            {
                return BadRequest("Tất cả bàn phải trống để ghép");
            }

            // Generate unique group ID
            var groupId = DateTime.UtcNow.Ticks.GetHashCode();
            var tableNumbers = string.Join(",", tables.Select(t => t.TableNumber));

            // Update all tables
            foreach (var table in tables)
            {
                table.IsMerged = true;
                table.MergedGroupId = groupId;
                table.MergedTableNumbers = tableNumbers;
                table.IsAvailable = false; // Mark as occupied when merged
            }

            await _context.SaveChangesAsync();

            return Ok(new MergeTablesResponse
            {
                GroupId = groupId,
                TableNumbers = tableNumbers,
                TotalCapacity = tables.Sum(t => t.Capacity),
                TableCount = tables.Count
            });
        }

        // POST: api/Tables/Split/{groupId} - Split merged tables
        [HttpPost("Split/{groupId}")]
        public async Task<IActionResult> SplitTables(int groupId)
        {
            var tables = await _context.Tables
                .Where(t => t.MergedGroupId == groupId)
                .ToListAsync();

            if (tables.Count == 0)
            {
                return NotFound("Không tìm thấy nhóm bàn ghép");
            }

            // Check if there are pending orders
            var hasPendingOrders = await _context.Orders
                .AnyAsync(o => o.OrderGroupId == groupId && o.Status == "Pending");

            if (hasPendingOrders)
            {
                return BadRequest("Không thể tách bàn khi còn đơn hàng đang xử lý. Vui lòng hoàn thành hoặc hủy đơn trước.");
            }

            // Unmerge all tables
            foreach (var table in tables)
            {
                table.IsMerged = false;
                table.MergedGroupId = null;
                table.MergedTableNumbers = null;
                table.IsAvailable = true;
            }

            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Đã tách {tables.Count} bàn thành công" });
        }

        // GET: api/Tables/Merged - Get all merged table groups
        [HttpGet("Merged")]
        public async Task<ActionResult<IEnumerable<MergedTableGroup>>> GetMergedTables()
        {
            var mergedTables = await _context.Tables
                .Where(t => t.IsMerged)
                .GroupBy(t => t.MergedGroupId)
                .Select(g => new MergedTableGroup
                {
                    GroupId = g.Key.Value,
                    TableNumbers = g.First().MergedTableNumbers,
                    TotalCapacity = g.Sum(t => t.Capacity),
                    TableCount = g.Count(),
                    IsOccupied = !g.First().IsAvailable
                })
                .ToListAsync();

            return Ok(mergedTables);
        }

        private bool TableExists(int id)
        {
            return _context.Tables.Any(e => e.Id == id);
        }
    }

    // DTOs for merge/split operations
    public class MergeTablesRequest
    {
        public List<int> TableIds { get; set; } = new();
    }

    public class MergeTablesResponse
    {
        public int GroupId { get; set; }
        public string TableNumbers { get; set; } = string.Empty;
        public int TotalCapacity { get; set; }
        public int TableCount { get; set; }
    }

    public class MergedTableGroup
    {
        public int GroupId { get; set; }
        public string? TableNumbers { get; set; }
        public int TotalCapacity { get; set; }
        public int TableCount { get; set; }
        public bool IsOccupied { get; set; }
    }
}

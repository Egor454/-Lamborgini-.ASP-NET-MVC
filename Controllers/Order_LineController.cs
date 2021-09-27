using Lab22.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Lab22.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Order_LineController : ControllerBase
    {
        private readonly MagazinContext _context;

        public Order_LineController(MagazinContext context)
        {
            _context = context;

        }
        [HttpGet]
        public IEnumerable<Order_Line> GetAll()
        {
            return _context.Order_Line;

        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetOrder_Line([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var order_line = await _context.Order_Line.SingleOrDefaultAsync(m => m.Order_LineID == id);

        //    if (order_line == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(order_line);
        //}
        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order_Line order_line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Order_Line.Add(order_line);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder_Line", new { id = order_line.Order_LineID }, order_line);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Order_Line.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Order_Line.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
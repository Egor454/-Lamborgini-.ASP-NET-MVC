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
    public class CarController : ControllerBase
    {
        private readonly MagazinContext _context;

        public CarController(MagazinContext context)
        {
            _context = context;
            if (_context.Car.Count() == 0)
            {
                
            }
        }
        [HttpGet]
        public IEnumerable<Car> GetAll()
        {
            return _context.Car.Include(d => d.Configuration).Include(p => p.Color);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var car = await _context.Car.Include(d => d.Configuration).Include(p => p.Color).SingleOrDefaultAsync(m => m.CarID == id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Car.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.CarID }, car);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Car.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = car.Name;
            item.Mark = car.Mark;
            item.Speed = car.Speed;
            item.Power = car.Power;
            item.ConfigurationFK = car.ConfigurationFK;
            item.ColorFK = car.ColorFK;
            item.Cost = car.Cost;


            _context.Car.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Car.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Car.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

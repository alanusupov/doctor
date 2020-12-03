using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.IService;
using Doctor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Doctor.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<T> : Controller where T : class
    {
        public IGenericService<T> _genericService;
        public GenericController(IGenericService<T> genericService)
        {
            _genericService = genericService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> Get()
        {
            var result = await _genericService.GetAllAsync();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> Get(int id)
        {
            var result = await _genericService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<T>> Post([FromBody] T value)
        {
            if (value == null)
                return BadRequest();
            var result = await _genericService.AddAsync(value);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<T>> Put([FromBody] T value)
        {
            if (value == null)
                return BadRequest();
            var result = await _genericService.UpdateAsync(value);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<T>> Delete(int id)
        {
            var result = await _genericService.DeleteAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}

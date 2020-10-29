using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.IService;
using Doctor.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<T> : Controller where T : class
    {
        private IGenericService<T> _genericService;
        public GenericController(IGenericService<T> genericService)
        {
            _genericService = genericService;
        }

        [HttpGet]
        public async Task<IEnumerable<T>> Get()
        {
            return await _genericService.GetAllAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<T> Get(int id)
        {
            return await _genericService.GetByIdAsync(id);
        }
 
        [HttpPost]
        public async Task<T> Post([FromBody] T value)
        {
            return await _genericService.AddAsync(value);
        }

        [HttpPut("{id}")]
        public async Task<T> Put(long id,[FromBody] T value)
        { 
            return await _genericService.UpdateAsync(value);
        }

        [HttpDelete("{id}")]
        public async Task<T> Delete(int id)
        {
            return await _genericService.DeleteAsync(id);
        }
    }
}

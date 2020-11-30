using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.IService;
using Doctor.Models;
using Doctor.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionController : GenericController<Reception>
    {
        ReceptionService _receptionService;
        public ReceptionController(IGenericService<Reception> genericService, ReceptionService receptionService) : base(genericService)
        {
            _receptionService = receptionService;
        }
        [HttpGet("Employee/{id}/{dateTime}")]
        public async Task<ActionResult<Dictionary<string,string>>> GetDateOfReceptions(int id, string dateTime)
        {
            var result = await _receptionService.GetDateOfReceptions(id, dateTime);
            if (result == null)
                return BadRequest();
            return Ok(result);
        }
        [HttpGet("Get")]
        public async Task<ActionResult<ReceptionGet>> GetReceptions()
        {
            var result = await _receptionService.GetAllAsync1();
            if (result == null)
                return BadRequest();
            return Ok(result);
        }
        [HttpGet("GetStatistics")]
        public async Task<ActionResult> GetStatistics(string fromDate, string toDate)
        {
            var result = await _receptionService.GetStatistics(fromDate, toDate);
            if (result == null)
                return BadRequest();
            return Ok(new {result, reservation = result.Count(), income = result.Count() * 300, hours = result.Count() });
        }
        [HttpPost("Post")]
        public async Task<ActionResult<ReceptionGet>> PostReceptions([FromBody] ReceptionPost reception)
        {
            var result = await _receptionService.AddAsync1(reception);
            if (result == null)
                return BadRequest();
            return Ok(result);
        }
        [HttpPut("Put")]
        public async Task<ActionResult<ReceptionGet>> PutReceptions([FromBody] ReceptionPost reception)
        {
            var result = await _receptionService.UpdateAsync1(reception);
            if (result == null)
                return BadRequest();
            return Ok(result);
        }
    }
}

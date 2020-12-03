using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.Models;
using Doctor.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalController : ControllerBase
    {
        readonly StatisticalService _statisticalService;
        public StatisticalController(StatisticalService statisticalService)
        {
            _statisticalService = statisticalService;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<List<TopEmployee>>> Get()
        {
            var result = await _statisticalService.GetTopEmployeeAsync();
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}

﻿using System;
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
    }
}

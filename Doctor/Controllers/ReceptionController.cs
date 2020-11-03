using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.IService;
using Doctor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceptionController : GenericController<Reception>
    {
        public ReceptionController(IGenericService<Reception> genericService) : base(genericService)
        {
        }
    }
}

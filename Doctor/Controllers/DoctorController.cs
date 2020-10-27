using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doctor.Data;
using Doctor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        readonly AppDbContext _db;

        public DoctorController(AppDbContext dbContext)
        {
            _db = dbContext;
            if (!_db.Employees.Any())
            {
                _db.Employees.Add(new Employee { Name = "FIO1", Email = "qwe1@gmail.com", AboutMe = "About me 1", Category = "1 category", Experience = "3 years", Specialty = "1akusher-ginekolog", PlaceOfWork = "Madmen 1"});
                _db.Employees.Add(new Employee { Name = "FIO2", Email = "qwe2@gmail.com", AboutMe = "About me 2", Category = "2 category", Experience = "3 years", Specialty = "2akusher-ginekolog", PlaceOfWork = "Madmen 2"});
                _db.Employees.Add(new Employee { Name = "FIO3", Email = "qwe3@gmail.com", AboutMe = "About me 3", Category = "3 category", Experience = "3 years", Specialty = "3akusher-ginekolog", PlaceOfWork = "Madmen 3"});
                _db.Employees.Add(new Employee { Name = "FIO4", Email = "qwe4@gmail.com", AboutMe = "About me 4", Category = "4 category", Experience = "3 years", Specialty = "4akusher-ginekolog", PlaceOfWork = "Madmen 4"});
            }
        }
        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            return _db.Employees.ToList();
        }
    }
}

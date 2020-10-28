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
                for(int i = 1; i<10; i++)
                {
                    _db.Employees.Add(
                        new Employee 
                        { 
                            EmployeeId = i,
                            Name = i+"FIO", 
                            Email = i+"qwe@gmail.com", 
                            AboutMe = i+"About me", 
                            Category = i+"category", 
                            Experience = i+"years", 
                            Specialty = i+"akusher-ginekolog", 
                            PlaceOfWork = i+"Madmen" 
                        });
                }
                _db.SaveChanges();
            }
        }
        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            return _db.Employees.ToList();
        }
        [HttpGet("{id}")]
        public async Task<Employee> Get(int id)
        {
            Employee employee = await _db.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);

            return employee;
        } 
    }
}

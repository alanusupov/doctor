using Doctor.Data;
using Doctor.IService;
using Doctor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class EmployeeService : IGenericService<Employee>
    {
        readonly AppDbContext _db;
        public EmployeeService(AppDbContext dbContext)
        {
            _db = dbContext;
            if (!_db.Employees.Any())
            {
                for (int i = 1; i < 10; i++)
                {
                    _db.Employees.Add(
                        new Employee
                        {
                            EmployeeId = i,
                            Name = i + "FIO",
                            Email = i + "qwe@gmail.com",
                            ImgUrl = "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg",
                            Specialty = i + "Akusher-ginekolog",
                            AboutMe = i + "About me",
                            Experience = i,
                            WorkExperience = new List<string> { "1WorkExperience", "2WorkExperience", "3WorkExperience" },
                            Education = new List<string> { "1Education", "2Education", "3Education" },
                            PerformedProcedures = new List<string> { "1PerformedProcedures", "2PerformedProcedures", "3PerformedProcedures" },
                            TreatmentOfDiseases = new List<string> { "1PerformedProcedures", "2PerformedProcedures", "3PerformedProcedures" }
                        });
                }
                _db.SaveChanges();
            }
        }

        public async Task<Employee> AddAsync(Employee empl)
        {
            var employee = new Employee
            {
                EmployeeId = _db.Employees.Any() ? _db.Employees.Max(p => p.EmployeeId) + 1 : 1,
                Name = empl.Name,
                Email = empl.Email,
                ImgUrl = empl.ImgUrl,
                Specialty = empl.Specialty,
                AboutMe = empl.AboutMe,
                Experience = empl.Experience,
                WorkExperience = empl.WorkExperience,
                Education = empl.Education,
                PerformedProcedures = empl.PerformedProcedures,
                TreatmentOfDiseases = empl.TreatmentOfDiseases
            };
            await _db.Employees.AddAsync(employee);
            await _db.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> DeleteAsync(int id)
        {
            var employee = await _db.Employees.FindAsync(id);
            if (employee != null)
            {
                _db.Employees.Remove(employee);
                await _db.SaveChangesAsync();
            }
            return employee;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _db.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            var employee = await _db.Employees.FindAsync(id);
            return employee;
        }

        public async Task<Employee> UpdateAsync(Employee empl)
        {
            var employee = await _db.Employees.FindAsync(empl.EmployeeId);

            if(employee != null)
            {
                employee.Name = empl.Name;
                employee.Email = empl.Email;
                employee.ImgUrl = empl.ImgUrl;
                employee.Specialty = empl.Specialty;
                employee.AboutMe = empl.AboutMe;
                employee.Experience = empl.Experience;
                employee.WorkExperience = empl.WorkExperience;
                employee.Education = empl.Education;
                employee.PerformedProcedures = empl.PerformedProcedures;
                employee.TreatmentOfDiseases = empl.TreatmentOfDiseases;
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch(DbUpdateConcurrencyException) when (!EmployeeExists(empl.EmployeeId))
                {
                    return null;
                }
                return employee;
            }
            return null;
        }
        private bool EmployeeExists(long id) =>
         _db.Employees.Any(e => e.EmployeeId == id);
    }
}

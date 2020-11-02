using Doctor.Data;
using Doctor.IService;
using Doctor.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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
                for (int i = 1; i < 4; i++)
                {
                    _db.Employees.Add(
                        new Employee
                        {
                            EmployeeId = i,
                            Name = i + "FIO",
                            Email = i + "qwe@gmail.com",
                            ImgUrl = "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg",
                            Specialties =new List<string> { "Specialty1", "Specialty2" },
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

        public async Task<Employee> AddAsync(Employee employee)
        {
            var _employee = new Employee
            {
                EmployeeId = _db.Employees.Any() ? _db.Employees.Max(p => p.EmployeeId) + 1 : 1,
                Name = employee.Name,
                Email = employee.Email,
                ImgUrl = employee.ImgUrl,
                Specialties = employee.Specialties,
                AboutMe = employee.AboutMe,
                Experience = employee.Experience,
                WorkExperience = employee.WorkExperience,
                Education = employee.Education,
                PerformedProcedures = employee.PerformedProcedures,
                TreatmentOfDiseases = employee.TreatmentOfDiseases
            };
            await _db.Employees.AddAsync(_employee);
            await _db.SaveChangesAsync();
            return _employee;
        }

        public async Task<Employee> DeleteAsync(int id)
        {
            var _employee = await _db.Employees.FindAsync(id);
            if (_employee != null)
            {
                _db.Employees.Remove(_employee);
                await _db.SaveChangesAsync();
            }
            return _employee;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _db.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            var _employee = await _db.Employees.FindAsync(id);
            return _employee;
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var _employee = await _db.Employees.FindAsync(employee.EmployeeId);

            if(_employee != null)
            {
                _employee.Name = employee.Name;
                _employee.Email = employee.Email;
                _employee.ImgUrl = employee.ImgUrl;
                _employee.Specialties = employee.Specialties;
                _employee.AboutMe = employee.AboutMe;
                _employee.Experience = employee.Experience;
                _employee.WorkExperience = employee.WorkExperience;
                _employee.Education = employee.Education;
                _employee.PerformedProcedures = employee.PerformedProcedures;
                _employee.TreatmentOfDiseases = employee.TreatmentOfDiseases;
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch(DbUpdateConcurrencyException) when (!EmployeeExists(employee.EmployeeId))
                {
                    return null;
                }
                return _employee;
            }
            return null;
        }
        private bool EmployeeExists(long id) =>
         _db.Employees.Any(e => e.EmployeeId == id);
    }
}

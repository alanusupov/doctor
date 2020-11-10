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
                for (int i = 0; i < 5; i++)
                {
                    _db.Employees.Add(
                        new Employee
                        {
                            FullName = "Анатолий Анатольев Анатольевич "+i,
                            Email = i + "qwe@gmail.com",
                            ImgUrl = "/img/doc.jpg",
                            EmployeeSpecialties = new List<EmployeeSpecialties> { 
                                new EmployeeSpecialties { Name = _db.Specialties.ToList()[i].Name },
                                new EmployeeSpecialties { Name = _db.Specialties.ToList()[i+1].Name }
                            },
                            AboutMe = i + "Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. Полное описание врача. ",
                            Experience = i,
                            WorkExperience = new List<string> 
                            { 
                                "По пунктно описаны места и конференции, где побывал врач. А так же получение наград и т.д. ",
                                "По пунктно описаны места и конференции, где побывал врач. А так же получение наград и т.д. ",
                                "По пунктно описаны места и конференции, где побывал врач. А так же получение наград и т.д. "
                            },
                            Education = new List<string> 
                            { 
                                "По пунктно описаны медецинские ВУЗы, курсы, училища, который закончил врач.",
                                "По пунктно описаны медецинские ВУЗы, курсы, училища, который закончил врач.",
                                "По пунктно описаны медецинские ВУЗы, курсы, училища, который закончил врач."
                            },
                            PerformedProcedures = new List<string> 
                            {
                                "Какие процедуры может выполнять врач.",
                                "Какие процедуры может выполнять врач.",
                                "Какие процедуры может выполнять врач."
                            },
                            TreatmentOfDiseases = new List<string> 
                            {
                                "Заболевание, которое может вылечить врач.",
                                "Заболевание, которое может вылечить врач.",
                                "Заболевание, которое может вылечить врач."
                            },
                            Rating = i
                        });
                }
                _db.SaveChanges();
            }
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            var _employee = new Employee
            {
                FullName = employee.FullName,
                Email = employee.Email,
                ImgUrl = employee.ImgUrl,
                EmployeeSpecialties = employee.EmployeeSpecialties,
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
            var _employee = await _db.Employees.Include(x => x.EmployeeSpecialties).FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (_employee != null)
            {   
                _db.Employees.Remove(_employee);
                await _db.SaveChangesAsync();
            }
            return _employee;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _db.Employees.Include(x => x.EmployeeSpecialties).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            var _employee = await _db.Employees.Include(x => x.EmployeeSpecialties).FirstOrDefaultAsync(x => x.EmployeeId == id);
            return _employee;
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var _employee = await _db.Employees.FindAsync(employee.EmployeeId);

            if(_employee != null)
            {
                _employee.FullName = employee.FullName;
                _employee.Email = employee.Email;
                _employee.ImgUrl = employee.ImgUrl;
                _employee.EmployeeSpecialties = employee.EmployeeSpecialties;
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

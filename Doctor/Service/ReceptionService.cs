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
    public static class Status
    {
        public static string Approved = "Одобрено";
        public static string Canceled = "Отмененные";
        public static string Pending = "В ожидании";
    }
    public class ReceptionService : IGenericService<Reception>
    {
        readonly AppDbContext _db;
        readonly EmailService _emailService;
        public ReceptionService(AppDbContext dbContext, EmailService emailService)
        {
            _db = dbContext;
            _emailService = emailService;
            if (!_db.Receptions.Any())
            {
                _db.Receptions.Add(
                    new Reception
                    {
                         Specialty = _db.Specialties.First(),
                         DateOfReceipt = DateTime.UtcNow,
                         Employee = _db.Employees.First(),
                         Client = new Client { Name = "FIO", Phone = "0987654321", Email = "qwe@gmail.com" },
                         Status = Status.Approved,
                         Registered = DateTime.UtcNow
                    });
                _db.Receptions.Add(
                    new Reception
                    {
                         Specialty = _db.Specialties.First(),
                         DateOfReceipt = DateTime.UtcNow,
                         Employee = _db.Employees.First(),
                         Client = new Client { Name = "FIO", Phone = "0987654321", Email = "qwe@gmail.com" },
                         Status = Status.Approved,
                         Registered = DateTime.UtcNow
                    });
                _db.SaveChanges();
            }
        }

        public async Task<Reception> AddAsync(Reception reception)
        {
            var _reception = new Reception
            {
                Specialty = reception.Specialty,
                DateOfReceipt = Convert.ToDateTime(reception.DateOfReceipt),
                Employee = reception.Employee,
                Client = reception.Client,
                Status = Status.Pending,
                Registered = DateTime.UtcNow
            };
            await _db.Receptions.AddAsync(_reception);
            await _db.SaveChangesAsync();
            _emailService.Send("",_reception.Status,_reception.Registered.ToString());
            return _reception;
        }
        public async Task<Reception> AddAsync1(ReceptionPost reception)
        {
            var _reception = new Reception
            {
                Specialty = await _db.Specialties.FindAsync(reception.SpecialtyId),
                DateOfReceipt = Convert.ToDateTime(reception.DateOfReceipt),
                Employee = await _db.Employees.Include(x => x.EmployeeSpecialties).FirstOrDefaultAsync(x => x.EmployeeId == reception.EmployeeId),
                Client = reception.Client,
                Status = Status.Pending,
                Registered = DateTime.UtcNow
            };
            await _db.Receptions.AddAsync(_reception);
            await _db.SaveChangesAsync();
            _emailService.Send("", _reception.Status, _reception.Registered.ToString());
            return _reception;
        }

        public async Task<Reception> DeleteAsync(int id)
        {
            var _reception = await _db.Receptions.Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.Specialty).FirstOrDefaultAsync(x => x.ReceptionId == id);
            if (_reception != null)
            {
                _db.Receptions.Remove(_reception);
                await _db.SaveChangesAsync();
            }
            return _reception;
        }

        public async Task<IEnumerable<Reception>> GetAllAsync()
        {
            return await _db.Receptions.Include(x => x.Client).ToListAsync();
        }
        public async Task<IEnumerable<ReceptionGet>> GetAllAsync1()
        {
            var reception =  await _db.Receptions.Include(x => x.Client)
                .Include(x => x.Specialty)
                .Include(x => x.Employee).ToListAsync();
            var receptionGet = new List<ReceptionGet>();
            foreach(Reception item in reception)
            {
                receptionGet.Add(new ReceptionGet { 
                    ReceptionId = item.ReceptionId,
                    Client = item.Client,
                    DateOfReceipt = item.DateOfReceipt,
                    EmployeeId = item.Employee.EmployeeId,
                    EmployeeFullName = item.Employee.FullName,
                    SpecialtyId = item.Specialty.SpecialtyId,
                    SpecialtyName = item.Specialty.Name,
                    Registered = item.Registered,
                    Status = item.Status
                });
            }
            return receptionGet;
        }

        public async Task<Reception> GetByIdAsync(int id)
        {
            var _reception = await _db.Receptions.FindAsync(id);
            return _reception;
        }

        public async Task<Reception> UpdateAsync(Reception reception)
        {
            var _reception = await _db.Receptions.FindAsync(reception.ReceptionId);

            if (_reception != null)
            {
                _reception.DateOfReceipt = reception.DateOfReceipt;
                _reception.Status = reception.Status;
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) when (!ReceptionExists(reception.ReceptionId))
                {
                    return null;
                }
                return _reception;
            }
            return null;
        }
        private bool ReceptionExists(long id) =>
         _db.Receptions.Any(e => e.ReceptionId == id);
        public async Task<List<DateTimeReception>> GetDateOfReceptions(int id,string dateTime)
        {
            var date = Convert.ToDateTime(dateTime);
            var reception = await _db.Receptions.Include(x => x.Employee).Where(x => x.DateOfReceipt >= date && x.DateOfReceipt < date.AddDays(1) && x.Employee.EmployeeId == id).ToListAsync();
            var result = new List<DateTimeReception>();
            if (reception.Count > 0)
            {   
                for(int i = 9;i < 18;i++)
                {
                    int j = 0;
                    if (int.Parse(reception[j].DateOfReceipt.ToString("hh")) == i-6)
                    {
                        result.Add(new DateTimeReception { dateTime = (int.Parse(reception[j].DateOfReceipt.ToString("hh"))+6).ToString(), status = "disable" });
                        j++;
                    }
                    else
                    {
                        result.Add(new DateTimeReception { dateTime = (i).ToString(), status = "enable" });
                    }
                }
            }
            else
            {
                for (int i = 9; i < 18; i++)
                {
                    result.Add(new DateTimeReception { dateTime = (i).ToString(), status = "enable" });    
                }
            }
            return result;
        }
    }
}

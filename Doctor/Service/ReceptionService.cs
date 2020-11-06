﻿using Doctor.Data;
using Doctor.IService;
using Doctor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class ReceptionService : IGenericService<Reception>
    {
        readonly AppDbContext _db;
        public static class Status
        {
            public static string Approved = "Одобрено";
            public static string Canceled = "Отмененные";
            public static string Pending = "В ожидании";
        }
        public ReceptionService(AppDbContext dbContext)
        {
            _db = dbContext;
            if (!_db.Receptions.Any())
            {
                _db.Receptions.Add(
                    new Reception
                    {
                         SpecialtyId = _db.Specialties.First().SpecialtyId,
                         DateOfReceipt = DateTime.UtcNow,
                         EmployeeId = _db.Employees.First().EmployeeId,
                         Client = new Client { Name = "FIO", Phone = "0987654321", Email = "qwe@gmail.com" },
                         Status = Status.Approved,
                         Registered = DateTime.UtcNow
                    });
                _db.Receptions.Add(
                    new Reception
                    {
                         SpecialtyId = _db.Specialties.First().SpecialtyId,
                         DateOfReceipt = DateTime.UtcNow,
                         EmployeeId = _db.Employees.First().EmployeeId,
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
                SpecialtyId = reception.SpecialtyId,
                DateOfReceipt = reception.DateOfReceipt,
                EmployeeId = reception.EmployeeId,
                Client = reception.Client,
                Status = reception.Status,
                Registered = reception.Registered
            };
            await _db.Receptions.AddAsync(_reception);
            await _db.SaveChangesAsync();
            return _reception;
        }

        public async Task<Reception> DeleteAsync(int id)
        {
            var _reception = await _db.Receptions.Include(x => x.Client.ClientId).FirstOrDefaultAsync(x => x.ReceptionId == id);
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
                _reception.SpecialtyId = reception.SpecialtyId;
                _reception.DateOfReceipt = reception.DateOfReceipt;
                _reception.EmployeeId = reception.EmployeeId;
                _reception.Client = reception.Client;
                _reception.Status = reception.Status;
                _reception.Registered = reception.Registered;
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
        public async Task<List<string>> GetDateOfReceptions(int id,DateTime date)
        {
            var reception = await _db.Receptions.Where(x => x.DateOfReceipt >= date && x.DateOfReceipt < date.AddDays(1) && x.EmployeeId == id).ToListAsync();
            var result = new List<string>();
            foreach(Reception item in reception)
            {
                result.Add(item.DateOfReceipt.ToString("hh"));
            }
            return result;
        }
    }
}

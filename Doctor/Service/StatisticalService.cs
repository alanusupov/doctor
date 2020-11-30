using Doctor.Data;
using Doctor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class StatisticalService
    {
        readonly EmployeeService _employeeService;
        readonly AppDbContext _db;
        public StatisticalService(AppDbContext db, EmployeeService employeeService)
        {
            _employeeService = employeeService;
            _db = db;
        }
        public async Task<List<TopEmployee>> GetTopEmployeeAsync()
        {
            var topEmployee = new List<TopEmployee>();
            var employee = await _employeeService.GetAllAsync();
            
            foreach(Employee item in employee)
            {
                var reception = await _db.Receptions.Include(x => x.Employee).Where(x => x.Employee.EmployeeId == item.EmployeeId && x.Status == Status.Approved).ToListAsync();

                topEmployee.Add(new TopEmployee
                {
                    EmployeeId = item.EmployeeId,
                    Reservation = reception.Count,
                    Hours = reception.Count,
                    Income = reception.Count * 300
                });
            }
            topEmployee.OrderByDescending(x => x.Reservation);
            return topEmployee;
        }
    }
}

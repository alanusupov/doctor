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
    public class SpecialtyService : IGenericService<Specialty>
    {
        readonly AppDbContext _db;
        public SpecialtyService(AppDbContext dbContext)
        {
            _db = dbContext;
             string [] spec = { "Педиатр", "Кардиолог" , "Инфекционисты", "Дерматовенеролог", "Гинекология", "Уролог", "Семейные врачи", "Терапевт", "ЛОР врач" };
            if (!_db.Specialties.Any())
            {
                foreach(string item in spec)
                {
                    _db.Specialties.Add(
                        new Specialty
                        {
                            Name = item
                        });
                }
                _db.SaveChanges();
            }
        }

        public async Task<Specialty> AddAsync(Specialty specialty)
        {
            var _specialty = new Specialty
            {
                Name = specialty.Name
            };
            await _db.Specialties.AddAsync(_specialty);
            await _db.SaveChangesAsync();
            return _specialty;
        }

        public async Task<Specialty> DeleteAsync(int id)
        {
            var _specialty = await _db.Specialties.FindAsync(id);
            if (_specialty != null)
            {
                _db.Specialties.Remove(_specialty);
                await _db.SaveChangesAsync();
            }
            return _specialty;
        }

        public async Task<IEnumerable<Specialty>> GetAllAsync()
        {
            return await _db.Specialties.ToListAsync();
        }

        public async Task<Specialty> GetByIdAsync(int id)
        {
            var _specialty = await _db.Specialties.FindAsync(id);
            return _specialty;
        }

        public async Task<Specialty> UpdateAsync(Specialty specialty)
        {
            var _specialty = await _db.Specialties.FindAsync(specialty.SpecialtyId);

            if (_specialty != null)
            {
                _specialty.Name = specialty.Name;
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) when (!SpecialtyExists(specialty.SpecialtyId))
                {
                    return null;
                }
                return _specialty;
            }
            return null;
        }
        private bool SpecialtyExists(long id) =>
         _db.Specialties.Any(e => e.SpecialtyId == id);
    }
}

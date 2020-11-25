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
    public class ClentService : IGenericService<Client>
    {
        readonly AppDbContext _db;
        public ClentService(AppDbContext dbContext)
        {
            _db = dbContext;
        }

        public Task<Client> AddAsync(Client ob)
        {
            throw new NotImplementedException();
        }

        public Task<Client> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            return await _db.Clients.ToListAsync();
        }

        public async Task<Client> GetByIdAsync(int id)
        {
            return await _db.Clients.FindAsync(id);
        }
        
        public async Task<Client> UpdateAsync(Client client)
        {
            var _client = await _db.Clients.FindAsync(client.ClientId);

            if (_client != null)
            {
                _client.Name = client.Name;
                _client.Phone = client.Phone;
                _client.Email = client.Email;
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) when (!ClientExists(client.ClientId))
                {
                    return null;
                }
                return _client;
            }
            return null;
        }
        private bool ClientExists(long id) =>
         _db.Clients.Any(e => e.ClientId == id);
    }
}

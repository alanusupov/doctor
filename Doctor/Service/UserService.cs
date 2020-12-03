using Doctor.Data;
using Doctor.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class UserService
    {
        private IConfiguration _config;
        readonly AppDbContext _db;

        public UserService(IConfiguration config, AppDbContext db)
        {
            _config = config;
            _db = db;
            if (!_db.UserAdmin.Any())
            {
                _db.UserAdmin.Add(
                    new UserAdmin
                    {
                        UserAdminId = 1,
                        UserName = "admin",
                        Pass = "admin",
                        Role = "admin"
                    }
                );
                _db.SaveChanges();
            }

        }
        public async Task<User> AuthenticateUserAsync(User login)
        {
            var user = new User();
            //demo static user
            if (login.UserName == "admin")
            {
                var admin = await _db.UserAdmin.FirstAsync();
                if(login.UserName == admin.UserName && login.Pass == admin.Pass)
                {
                    user.UserName = admin.UserName;
                    user.Role = admin.Role;
                }
            }
            else
            {
                user = await _db.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName);
            }
            return user;
        }
        public string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, userInfo.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(100),
                signingCredentials: credentials);
            var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodetoken;
        }
    }
}

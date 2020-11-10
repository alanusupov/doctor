using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Doctor.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Doctor.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Login(AuthenticateRequest model)
        {
            UserModel login = new UserModel();
            login.UserName = model.Username;
            login.Pass = model.Password;

            IActionResult response = Unauthorized();

            var user = AuthenticateUser(login);
            if (user.UserName != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { email = user.Email, token = tokenString });
            }
            return response;
        }
        private UserModel AuthenticateUser(UserModel login)
        {
            var user = new UserModel();
            //demo static user
            if (login.UserName == "qweyn" && login.Pass == "123")
            {
                user = new UserModel { UserName = "qweyn", Email = "qweyn@gmail.com", Pass = "123", Role = "admin" };
            }
            return user;
        }
        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, userInfo.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: credentials);
            var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodetoken;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            try
            {
                return Ok(value);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}

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
using Doctor.Service;

namespace Doctor.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        UserService _userService;
        public LoginController(UserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(AuthenticateRequest model)
        {
            User login = new User();
            login.UserName = model.Username;
            login.Pass = model.Password;

            IActionResult response = Unauthorized();

            var user = await _userService.AuthenticateUserAsync(login);
            if (user != null)
            {
                var tokenString = _userService.GenerateJSONWebToken(user);
                response = Ok(new { userName = user.UserName, role = user.Role, token = tokenString });
            }
            return response;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("admin")]
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

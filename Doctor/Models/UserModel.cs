using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string Pass { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

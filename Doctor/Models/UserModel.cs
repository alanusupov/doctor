using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Pass { get; set; }
        [Required]
        public string Role { get; set; }
    }
    public class UserAdmin
    {
        public int UserAdminId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Pass { get; set; }
        [Required]
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

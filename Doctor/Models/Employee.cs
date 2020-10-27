using System;
using System.Collections.Generic;
using System.Text;

namespace Doctor.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string AboutMe { get; set; }
        public string Experience { get; set; }
        public string Category { get; set; }
        public string Specialty { get; set; }
        public string PlaceOfWork { get; set; }
    }
}

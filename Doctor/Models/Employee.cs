using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Doctor.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Specialty { get; set; }
        public string AboutMe { get; set; }
        public int Experience { get; set; }
        public List<string> WorkExperience { get; set; }
        public List<string> Education { get; set; }
        public List<string> PerformedProcedures { get; set; }
        public List<string> TreatmentOfDiseases { get; set; }
    }
}

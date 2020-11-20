using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Models
{
    public class Reception
    {
        public int ReceptionId { get; set; }
        public Specialty Specialty { get; set; }
        public DateTime DateOfReceipt { get; set; }
        public Employee Employee { get; set; }
        public Client Client { get; set; }
        public string Status { get; set; }
        public DateTime Registered { get; set; }
    }
    public class DateTimeReception
    {
        public string dateTime { get; set; }
        public string status { get; set; }
    }
    public class ReceptionRequest
    {
        public int SpecialtyId { get; set; }
        public string DateOfReceipt { get; set; }
        public int EmployeeId { get; set; }
        public Client Client { get; set; }
    }
}

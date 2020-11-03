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
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Models
{
    public class Specialty
    {
        public int SpecialtyId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Priority { get; set; }
    }
}

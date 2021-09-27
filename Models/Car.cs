using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lab22.Models
{
    public partial class Car
    {
        public Car()
        {
            Order_Line = new HashSet<Order_Line>();
        }
        [Key]
        public int CarID { get; set; }
        public string Name { get; set; }
        public string Mark { get; set; }
        public decimal Cost { get; set; }
        public decimal Speed { get; set; }
        public decimal? Power { get; set; }
        public int ConfigurationFK { get; set; }
        public int ColorFK { get; set; }
        public bool? Visible { get; set; }
        public virtual ICollection<Order_Line> Order_Line { get; set; }
        public virtual Configuration Configuration { get; set; }
        public virtual Color Color { get; set; }




    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lab22.Models
{
    public partial class Order
    {
        public Order()
        {
            Order_Line = new HashSet<Order_Line>();
        }
        [Key]
        public int OrderID { get; set; }
        public string UserFK { get; set; }
        public decimal Cost { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime? DataEnd { get; set; }
        public string Address { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<Order_Line> Order_Line { get; set; }




    }
}


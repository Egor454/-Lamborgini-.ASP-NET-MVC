using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lab22.Models
{
    public class Order_Line
    {
        [Key]
        public int Order_LineID { get; set; }
        public int OrderFK { get; set; }
        public int CarFK { get; set; }
        public virtual Order Order { get; set; }
        public virtual Car Car { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Lab22.Models;

namespace Lab22.Models
{
    public partial class Color
    {
        public Color()
        {
            Car = new HashSet<Car>();
        }
        [Key]
        public int ColorID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Car> Car { get; set; }
    }
}

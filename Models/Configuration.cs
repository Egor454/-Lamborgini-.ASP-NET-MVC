using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lab22.Models
{
    public partial class Configuration
    {
        public Configuration()
        {
            Car = new HashSet<Car>();
        }
        [Key]
        public int ConfigurationID { get; set; }
        public string Name { get; set; }


        public virtual ICollection<Car> Car { get; set; }
    }
}

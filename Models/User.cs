using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Lab22.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Order = new HashSet<Order>();
        }
        [Required]
        public string FIO { get; set; }
        public virtual ICollection<Order> Order { get; set; }
 
    }

}

using System;
using System.Collections.Generic;

namespace OrdersMgr.BO.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Order = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Description { get; set; }

        public ICollection<Order> Order { get; set; }
    }
}

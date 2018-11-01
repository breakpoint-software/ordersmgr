using System;
using System.Collections.Generic;

namespace OrdersMgr.BO.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public int Id { get; set; }
        public string Description { get; set; }

        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace OrdersMgr.BO.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public int CustomerId { get; set; }
        public DateTime Fecha { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }

        public Customer Customer { get; set; }
        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}

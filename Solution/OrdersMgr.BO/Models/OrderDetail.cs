using System;
using System.Collections.Generic;

namespace OrdersMgr.BO.Models
{
    public partial class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int UnitaryPrice { get; set; }
        public decimal Subtotal { get; set; }

        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrdersMgr.Model.Api
{
    public class OrderModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int CustomerId { get; set; }
        public string Customer { get; set; }
        public DateTime Date{ get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }

        public List<OrderDetailModel> Details { get; set; }

        public OrderModel()
        {
            Details = new List<OrderDetailModel>();
        }
    }
}

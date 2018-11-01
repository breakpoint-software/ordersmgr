using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrdersMgr.Model.Api
{
    public class ProductOrderModel
    {
        int _orderId;
        public int OrderId { get { return _orderId; } set { _orderId = value; } }
        public int ProductId { get; set; }

        public int Quantity { get; set; }
        public int Price { get; set; }
        }
    }

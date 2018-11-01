using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OrdersMgr.BO.Models;
using OrdersMgr.Model;
using OrdersMgr.Model.Api;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using OrdersMgr.Model.MTConfig;
using Microsoft.Extensions.Options;

namespace OrdersMgr.BO.Facade
{
    public class OrdersFacade
    {

        OrdersMgrContext _dbContext;

        public OrdersFacade(OrdersMgrContext dbContext)
        {
            _dbContext = dbContext;
        }


        public List<OrderModel> GetOrders()
        {
            return _dbContext.Order.Include(e => e.Customer).
            Select(o => new OrderModel
            {
                Id = o.Id,
                Description = o.Description,
                Date = o.Fecha,
                Customer = o.Customer.Description,
                CustomerId = o.Customer.Id,
                Quantity = o.Quantity,
                Total = o.Total
            }).ToList();

        }

        public void UpdateProductOrder(ProductOrderModel info)
        {
            Order o = null;
            o = _dbContext.Order.Include(i => i.OrderDetail).Where(d => d.Id == info.OrderId).FirstOrDefault();

            if (o != null)
            {
                //update the quantity of the specified detail and update the totals in the ooder 
                OrderDetail detail = o.OrderDetail.Where(d => d.ProductId == info.ProductId).FirstOrDefault();
                detail.Quantity = info.Quantity;
                detail.UnitaryPrice = info.Price;
                detail.Subtotal = info.Quantity * info.Price;
                o.Total = o.OrderDetail.Sum(d => d.Quantity * d.UnitaryPrice);
                o.Quantity = o.OrderDetail.Sum(d => d.Quantity);
            }
            _dbContext.SaveChanges();
        }

        public OrderModel GetFullOrder(int orderId)
        {
            OrderModel o = null;
            o = _dbContext.Order.Where(d => d.Id == orderId).Select(order => new OrderModel
            {
                Id = order.Id,
                Description = order.Description,
                Date = order.Fecha,
                Customer = order.Customer.Description,
                CustomerId = order.Customer.Id,
                Quantity = order.Quantity,
                Total = order.Total

            }).FirstOrDefault();

            if (o != null)
            {
                _dbContext.OrderDetail.Include(p => p.Product).Where(d => d.OrderId == o.Id).ToList()
                    .ForEach(d => o.Details.Add(new OrderDetailModel
                    {
                        Id = o.Id,
                        OrderId = d.OrderId,
                        Product = d.Product.Description,
                        ProductId = d.Product.Id,
                        Subtotal = d.Subtotal,
                        UnitaryPrice = d.UnitaryPrice,
                        Quantity = d.Quantity,

                    }));
            }
            return o;
        }
    }
}

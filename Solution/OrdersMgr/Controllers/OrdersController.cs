using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrdersMgr.BO.Facade;
using OrdersMgr.BO.Models;
using OrdersMgr.Model.Api;

namespace OrdersMgr.Controllers
{
    [Authorize]
    public class OrdersController : ControllerBase
    {
        OrdersFacade _facade = null;
        public OrdersController(OrdersFacade facade)
        {
            _facade = facade;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<OrderModel>> Hello()
        {
            return Ok("Hello from Orders Mgr!");
        }

        [HttpGet]
        public ActionResult<IEnumerable<OrderModel>> Get()
        {
            return Ok(_facade.GetOrders());
        }

        [HttpGet]
        public ActionResult<OrderModel> GetFullOrder(int id)
        {
            return Ok(_facade.GetFullOrder(id));
        }

        [HttpPut]
        public ActionResult UpdateProductOrder([FromBody] ProductOrderModel info)
        {
            _facade.UpdateProductOrder(info);

            return Ok(_facade.GetFullOrder(info.OrderId));
        }


    }

  
}

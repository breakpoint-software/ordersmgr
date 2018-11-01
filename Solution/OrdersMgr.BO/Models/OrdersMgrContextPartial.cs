using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OrdersMgr.Model.MTConfig;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OrdersMgr.BO.Models
{
    public partial class OrdersMgrContext : DbContext
    {
        private IHttpContextAccessor _httpContextAccesor = null;
        private Multitenancy _multitenancy = null;

        public OrdersMgrContext(IHttpContextAccessor httpContextAccessor, IOptions<Multitenancy> multitenancy)
        {
            _multitenancy = multitenancy.Value;
            _httpContextAccesor = httpContextAccessor;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                string tenantId = _httpContextAccesor.HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid")?.Value;

                if (string.IsNullOrEmpty(tenantId))
                    throw new InvalidOperationException("It's not possible obtain tenant id ");

                Tenant tenant = _multitenancy.Tenants.Where(t => t.TenantId == tenantId).FirstOrDefault();
                if (tenant == null)
                    throw new InvalidOperationException("There is no Db connection configure to the current tenant. Please check appsetting.json file");

                optionsBuilder.UseSqlServer(tenant.ConnectionString);
                //optionsBuilder.UseSqlServer("Data Source=DESKTOP-HKARUIG;Initial Catalog=OrdersMgr;User ID=stduser;Password=redrain");
            }
        }

    }


  
}

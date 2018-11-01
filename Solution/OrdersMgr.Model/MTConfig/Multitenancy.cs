using System.Collections.Generic;

namespace OrdersMgr.Model.MTConfig
{
    public class Multitenancy
    {
        public List<Tenant> Tenants { get; set; }

    }
    public class Tenant
    {
        public string TenantId { get; set; }
        public string ConnectionString { get; set; }
    }
}
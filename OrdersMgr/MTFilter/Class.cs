using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Microsoft.Extensions.Configuration.IConfiguration

namespace OrdersMgr.MTFilter
{
    public class MTAuthorizeAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            string issuer = ClaimsPrincipal.Current.FindFirst(ClaimTypes.Name).Issuer;
            string UPN = ClaimsPrincipal.Current.FindFirst(ClaimTypes.Name).Value;
            string tenantID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid").Value;
            using (TodoListServiceMTContext db = new TodoListServiceMTContext())
            {
                
                if (!(
                    // Verifies if the organization to which the caller belongs is trusted.
                    // This onboarding style is not possible in the consent flow originated by a native app shown in this sample,
                    // but it could be achieved by triggering consent from an associated web application.
                    // For details, see the sample https://github.com/AzureADSamples/WebApp-WebAPI-MultiTenant-OpenIdConnect-DotNet
                    (db.Tenants.FirstOrDefault(a => ((a.IssValue == issuer) && (a.AdminConsented))) != null)
                    // Verifies if the caller is in the db of onboarded users.                    
                    || (db.Users.FirstOrDefault(b => (b.UPN == UPN) && (b.TenantID == tenantID)) != null)
                    ))
                {
                    actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized,
                        string.Format("The user {0} has not been onboarded. Sign up and try again", UPN));
                }
            }
        }
    }
}

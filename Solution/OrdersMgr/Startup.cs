using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Web.Http;
using System.Web;
using Owin;
using OrdersMgr.BO.Facade;
using OrdersMgr.Model.MTConfig;
using OrdersMgr.BO.Models;

namespace OrdersMgr
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(sharedOptions =>
                     {
                         sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                         
                     })
                     .AddJwtBearer(options =>
                     {
                         options.Audience = Configuration["AzureAd:ClientId"];
                         options.Authority = $"{Configuration["AzureAd:Instance"]}{Configuration["AzureAd:TenantId"]}";
                         options.TokenValidationParameters.ValidateIssuer = false;
                     });

            services.AddMvc();
            services.AddCors();

            // add context accessor to determinate the current azure user when the data access is needed 
            services.AddHttpContextAccessor();
            services.AddTransient<OrdersMgrContext>();
            services.AddTransient<OrdersFacade>();


            //load Azure multitenant configuration
            services.Configure<Multitenancy>(Configuration.GetSection("Multitenancy"));
            services.AddOptions();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
            app.UseAuthentication();
            app.UseMvc(routes => routes.MapRoute("Default", "v1/{controller}/{action}/{id}", new { controller = "Orders", action = "Hello", id = RouteParameter.Optional }));
        }
    }
}

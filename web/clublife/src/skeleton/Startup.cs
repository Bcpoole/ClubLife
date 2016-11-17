using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using skeleton.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace skeleton {
  public class Startup {
    public static void Main(string[] args) {
      var host = new WebHostBuilder()
          .UseKestrel()
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }

    public Startup(IHostingEnvironment env) {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

      if (env.IsDevelopment()) {
        // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
        builder.AddUserSecrets();

        // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
        builder.AddApplicationInsightsSettings(developerMode: true);
      }

      builder.AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      // Add framework services.

      services.AddApplicationInsightsTelemetry(Configuration);

      services.AddAuthentication(options => {
        options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
      });

      services.AddMvc();

      // Add application services.

      services.AddSingleton<IOrganizationsRepository, OrganizationsRepository>();
      services.AddSingleton<IUsersRepository, UsersRepository>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
      } else {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();

      app.UseCookieAuthentication(new CookieAuthenticationOptions {
        AutomaticAuthenticate = true,
        AutomaticChallenge = true,
        LoginPath = new PathString("/signin"),
        LogoutPath = new PathString("/signout")
      });

      //app.UseCookieAuthentication(new CookieAuthenticationOptions() {
      //  AuthenticationScheme = "MyCookieMiddlewareInstance",
      //  LoginPath = new PathString("/Account/Unauthorized/"),
      //  AccessDeniedPath = new PathString("/Account/Forbidden/"),
      //  AutomaticAuthenticate = true,
      //  AutomaticChallenge = true
      //});

      app.UseGoogleAuthentication(new GoogleOptions {
        ClientId = Credentials.GoogleClientId,
        ClientSecret = Credentials.ClientSecret
      });

      app.UseMvc(routes => {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}

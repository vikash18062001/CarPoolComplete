using System.Text;
using CarPool.Constants;
using CarPool.Contracts.Rides;
using CarPool.Contracts.Users;
using CarPool.Concerns;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CarPool.Providers;
using CarPool.Contracts.Account;
using AutoMapper;
using CarPool.Web.AutoMapperProfile;
using CarPool.Contracts.Locations;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRideService, RideService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IOfferedRideService, OfferRideService>();
builder.Services.AddScoped<IBookedRideService, BookRideService>();
builder.Services.AddSingleton<UserContext>();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot";
});

// Ot
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddMvc();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<CarPoolDbContext>(opt => { opt.UseSqlServer(Constants.ConnectionString,b=>b.MigrationsAssembly("CarPool.Web")); });
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


app.UseRouting();

app.UseDefaultFiles();

app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot";
    spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
    {
        RequestPath = "/index.html"
    };
});

app.UseHttpsRedirection();

app.MapControllers();

app.UseAuthentication();

app.UseAuthorization();

app.MapDefaultControllerRoute();


app.Run();


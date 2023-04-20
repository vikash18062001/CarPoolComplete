using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarPool.Concerns;
using CarPool.Contracts.Account;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CarPool.Providers
{
	public class AccountService : IAccountService
	{
        private readonly CarPoolDbContext _context;
        private readonly IConfiguration _config;

        public AccountService(CarPoolDbContext context,IConfiguration config)
        {
            this._context = context;
            this._config= config;
        }

        public APIResponse<string> Authenticate(LoginRequest loginRequest)
        {
            APIResponse<string> apiResponse = new APIResponse<string>();
            User user = new User();
            try
            {
                user = _context.User.Where(user => user.Email == loginRequest.Email && user.Password == loginRequest.Password).FirstOrDefault() ?? user;
                if (user.ID != 0)
                {
                    var token = GenerateToken(user);
                    apiResponse = Utility<string>.GetApiResponse("Successfully logged in", true, token);
                }
                else
                    apiResponse = Utility<string>.GetApiResponse("No User found", false, "");
            }
            catch (Exception ex)
            {
                apiResponse = Utility<string>.GetApiResponse(ex.ToString(), false, "");
            }

            return apiResponse;
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "Any Random Key"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserName),
                new Claim(ClaimTypes.SerialNumber,user.ID.ToString()),
                new Claim(ClaimTypes.Email,user.Email)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(10), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public APIResponse<string> Login(LoginRequest loginRequest)
        {
            return this.Authenticate(loginRequest);
        }

        public async Task<APIResponse<string>> SignUp(User user)
        {
            APIResponse<string> apiResponse = new APIResponse<string>();

            try
            {
                bool isEmailNotAvailable = this.IsEmailExist(user.Email);
                if (isEmailNotAvailable != true)
                {
                    _context.User.Add(user);
                    await _context.SaveChangesAsync();
                    user.UserName = "Dummy#" + user.ID;
                    await _context.SaveChangesAsync();
                    apiResponse = Utility<string>.GetApiResponse("Successfully signed up", true, "");
                }
                else
                    apiResponse = Utility<string>.GetApiResponse("Email Already Exist", false, "");
            }
            catch (Exception ex)
            {
                apiResponse = Utility<string>.GetApiResponse($"Some error occured {ex}", false, "");
            }
            return apiResponse;
        }


        public bool IsEmailExist(string email)
        {
            try
            {
                bool ans = _context.User.Any(usr => usr.Email == email);
                return ans;
            }
            catch
            {
                return false;
            }
        }
    }
}


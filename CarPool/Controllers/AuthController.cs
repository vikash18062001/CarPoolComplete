using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarPool.Concerns;
using CarPool.Contracts.Account;
using CarPool.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CarPool.Controllers
{
	[ApiController]
    [Produces("application/json")]
    [Route("api/auth")]
	public class AuthController : ControllerBase
	{
		private readonly IConfiguration _config;
		private readonly IAccountService _accountService;

		public AuthController(IConfiguration config, IAccountService service)
		{
			this._config = config;
			this._accountService = service;
		}

		[AllowAnonymous]
		[HttpPost]
		public APIResponse<string> Authenticate([FromBody] LoginRequest loginRequest)
		{
			return this._accountService.Login(loginRequest);	
		}
    }
}


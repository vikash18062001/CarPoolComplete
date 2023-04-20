using System;
using CarPool.Concerns;
using CarPool.Contracts.Account;
using CarPool.Contracts.Users;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Controllers
{
	[ApiController]
    [Route("user")]
	public class AccountController : ControllerBase
	{

        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            this._accountService = accountService;
        }

        [HttpPost]
        [Route("signup")]
        public APIResponse<string> SignUp([FromBody] User user)
        {
            return _accountService.SignUp(user).Result;
        }
    }
}


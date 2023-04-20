using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CarPool.Contracts.Users;
using CarPool.Concerns;

namespace CarPool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet]
        [Route("{email}")]
        public APIResponse<User> GetUserByEmail(string email)
        {
            return _userService.GetUserByEmail(email);
        }

        [HttpPost] // insteas try to use put requestd
        [Route("update")]
        public APIResponse<User> UploadData(User user)
        {
            return _userService.UploadData(user);
        }
        [HttpGet]
        [Route("currentuser")]
        public APIResponse<User> GetCurrentUser()
        {
            return this._userService.GetUser();
        }
    }
}


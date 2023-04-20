using System;
using CarPool.Concerns;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace CarPool.Providers
{
	public class UserContext
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public UserContext(IHttpContextAccessor httpContextAccessor)
		{
			this._httpContextAccessor = httpContextAccessor;
		}

        public User GetCurrentUser()
        {
            var identity = this._httpContextAccessor?.HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    UserName = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value,
                    ID = Convert.ToInt32(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value),
                    Email = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                };

            }
            return null;
        }
    }
}


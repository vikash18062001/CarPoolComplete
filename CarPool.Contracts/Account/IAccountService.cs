using CarPool.Concerns;

namespace CarPool.Contracts.Account
{
	public interface IAccountService
	{
        public APIResponse<string> Authenticate(LoginRequest loginRequest);

        public APIResponse<string> Login(LoginRequest loginRequest);

		public Task<APIResponse<string>> SignUp(User user);

		public bool IsEmailExist(string user);
	}
}


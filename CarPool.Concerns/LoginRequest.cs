namespace CarPool.Concerns
{
	public class LoginRequest
	{
        public string Email { get; set; }

        public string Password { get; set; }

        public LoginRequest()
        {
            this.Email = string.Empty;

            this.Password = string.Empty;
        }
    }
}
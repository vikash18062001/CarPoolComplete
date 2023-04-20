using CarPool.Contracts.Users;
using CarPool.Concerns;

namespace CarPool.Providers
{
    public class UserService : IUserService
    {
        private readonly CarPoolDbContext _context;
        private readonly UserContext _userContext;

        public UserService(CarPoolDbContext context,UserContext userContext)
        {
            this._context = context;
            this._userContext = userContext;
        }

        public APIResponse<User> GetUserByEmail(string email)
        {
            APIResponse<User> apiResponse = new APIResponse<User>();
            User? user = new User();
            try
            {
                user = _context.User.Where(user => user.Email == email).First();
                apiResponse = Utility<User>.GetApiResponse("", true, user != null ? user : new User());
            }
            catch(Exception ex)
            {
                apiResponse = Utility<User>.GetApiResponse(ex.ToString(), false, user);
            }

            return apiResponse;
        }

        public APIResponse<User> UploadData(User user)
        {
            APIResponse<User> apiResponse = new APIResponse<User>();
            try
            {
                _context.User.Update(user);
                _context.SaveChanges();
                apiResponse = Utility<User>.GetApiResponse("Successfull", true, user);
            }
            catch(Exception ex)
            {
                apiResponse = Utility<User>.GetApiResponse("Some error occured", false, user);
            }
            return apiResponse;
        }

        public APIResponse<User> GetUser()
        {
            APIResponse<User> apiResponse = new APIResponse<User>();
            User user = new User();
            try
            {
                user = this._userContext.GetCurrentUser();
                user = _context.User.Where(usr => usr.Email == user.Email).First();
                apiResponse = Utility<User>.GetApiResponse("Success", true, user);
            }
            catch(Exception ex)
            {
                apiResponse = Utility<User>.GetApiResponse($"Some error occured {ex}", false, user);
            }
            return apiResponse;
        }
    }
}


using System;
using CarPool.Concerns;

namespace CarPool.Contracts.Users
{
    public interface IUserService
    {
        public APIResponse<User> GetUserByEmail(string email);

        public APIResponse<User> UploadData(User user);

        public APIResponse<User> GetUser();
    }
}


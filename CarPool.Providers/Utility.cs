using System;
using CarPool.Concerns;

namespace CarPool.Providers
{
    public static class Utility<T>
    {
        public static APIResponse<T> GetApiResponse(string msg, bool isSuccess,T data)
        {
            return new APIResponse<T>() { Message = msg, Data = data, IsSuccess = isSuccess };
        }
    }
}


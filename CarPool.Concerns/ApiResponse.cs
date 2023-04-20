namespace CarPool.Concerns
{
	public class APIResponse<T>
	{
        public string Message { get; set; }

        public bool IsSuccess { get; set; }

        public T Data { get; set; }

        public APIResponse()
        {
            this.Message = string.Empty;

            this.Data = default!;
        }
    }
}
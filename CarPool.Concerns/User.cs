using System.ComponentModel.DataAnnotations;

namespace CarPool.Concerns
{
	public class User
	{
        [Key]
        public int ID { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string ProfileUrl { get; set; }

        public string UserName { get; set; }

        public DateTime CreatedOn { get; set; }

        public User()
        {
            this.Email = string.Empty;

            this.Password = string.Empty;

            this.UserName = string.Empty;

            this.ProfileUrl = string.Empty;

            this.CreatedOn = DateTime.Now;
        }
    }
}
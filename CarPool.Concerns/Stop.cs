using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPool.Concerns
{
	public class Stop
	{
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }

        [ForeignKey("OfferedRide")]
        public int RideId { get; set; }

        public OfferedRide? OfferedRide { get; set; }

        public Stop()
        {
            this.Name = string.Empty;

            this.CreatedOn = DateTime.Now;
        }
    }
}
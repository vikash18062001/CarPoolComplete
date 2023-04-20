using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarPool.Concerns
{
	public class OfferedRide
	{
        [Key]
        public int ID { get; set; }

        public int Source { get; set; }

        public int Destination { get; set; }

        public DateTime JourneyOn { get; set; }

        public string StartTime { get; set; }

        public int AvailableSeats { get; set; }

        public double PricePerSeat { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool IsActive { get; set; }

        [JsonIgnore]
        public virtual ICollection<Stop>? Stops { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking>? Bookings { get; set; }

        public OfferedRide()
        {
            this.StartTime = string.Empty;

            this.CreatedOn = DateTime.Now;
        }
    }
}
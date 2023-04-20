using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CarPool.Concerns
{
	public class Booking
	{
        [Key]
        public int ID { get; set; }

        public int Source { get; set; }

        public int Destination { get; set; }

        public int BookedSeat { get; set; }

        [ForeignKey("OfferedRide")]
        public int OfferID { get; set; }

        [JsonIgnore]
        public OfferedRide? OfferedRide { get; set; }

        [ForeignKey("User")] // in place of bookerId
        public int CreatedBy { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        public DateTime CreatedOn { get; set; }

        public Booking()
        {
            this.CreatedOn = DateTime.Now;
        }
    }
}
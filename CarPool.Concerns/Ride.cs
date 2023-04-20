namespace CarPool.Concerns
{
    public class Ride
    {
        public int ID { get; set; }

        public int RideOfferedBy { get; set; }

        public int RideTakenBy { get; set; }

        public string Source { get; set; }

        public string Destination { get; set; }

        public List<string> Stops { get; set; }

        public DateTime JourneyOn { get; set; }

        public string StartTime { get; set; }

        public int AvailableSeats { get; set; }

        public double Price { get; set; }

        public int Seats { get; set; }

        public string UserEmail { get; set; }

        public Ride()
        {
            this.Source = string.Empty;

            this.Destination = string.Empty;

            this.Stops = new List<string>();

            this.StartTime = string.Empty;

            this.UserEmail = string.Empty;
        }
    }
}
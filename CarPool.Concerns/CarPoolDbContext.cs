using Microsoft.EntityFrameworkCore;

namespace CarPool.Concerns
{
	public class CarPoolDbContext : DbContext
	{
        public CarPoolDbContext(DbContextOptions<CarPoolDbContext> options) : base(options)
        { }

        public DbSet<Booking> Booking { get; set; }

        public DbSet<OfferedRide> OfferedRide { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Location> Location { get; set; }

        public DbSet<Stop> Stop { get; set; }
    }
}
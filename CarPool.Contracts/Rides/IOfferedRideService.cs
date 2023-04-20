using CarPool.Concerns;

namespace CarPool.Contracts.Rides
{
	public interface IOfferedRideService
	{
        public Task<APIResponse<string>> OfferRide(Ride ride);

        public APIResponse<List<Ride>> GetOfferedRides();

    }
}


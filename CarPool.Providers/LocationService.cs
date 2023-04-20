using System;
using CarPool.Concerns;
using CarPool.Contracts.Locations;

namespace CarPool.Providers
{
	public class LocationService : ILocationService
	{
		private readonly CarPoolDbContext _context;
		public LocationService(CarPoolDbContext context)
		{
			this._context = context;
		}

		public APIResponse<List<Location>> GetLocation()
		{
			APIResponse<List<Location>> apiResponse = new APIResponse<List<Location>>();
			List<Location> allLocation = new List<Location>();
			try
			{
				allLocation = _context.Location.ToList();
				apiResponse = Utility<List<Location>>.GetApiResponse("Successfully fetched the location", true, allLocation);
			}
			catch(Exception ex)
			{
                apiResponse = Utility<List<Location>>.GetApiResponse($"Error occured {ex}", false, allLocation);
            }
			return apiResponse;
        }
	}
}


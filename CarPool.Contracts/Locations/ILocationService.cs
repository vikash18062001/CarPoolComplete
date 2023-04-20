using System;
using CarPool.Concerns;

namespace CarPool.Contracts.Locations
{
	public interface ILocationService
	{
		public APIResponse<List<Location>> GetLocation();
	}
		
}


using System;
using CarPool.Concerns;
using CarPool.Contracts.Locations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Controllers
{
	[ApiController]
	[Authorize]
	[Route("location")]
	public class LocationController : ControllerBase
	{
		private readonly ILocationService _locService;
		public LocationController(CarPoolDbContext context,ILocationService locationService)
		{
			this._locService = locationService;
		}

		[HttpGet]
		public APIResponse<List<Location>> GetLocation()
		{
			return this._locService.GetLocation();
		}


	}
}


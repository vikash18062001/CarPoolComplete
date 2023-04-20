using System;
using System.Security.Claims;
using CarPool.Concerns;
using CarPool.Contracts.Rides;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarPool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("ride")]
	public class OfferRideController : ControllerBase
	{

        private readonly IOfferedRideService _rideService;
		public OfferRideController(IOfferedRideService rideService)
		{
            this._rideService = rideService;
		}

        [HttpPost]
        [Route("offerride")]
        public APIResponse<string> OfferRide(Ride ride)
        {
            return _rideService.OfferRide(ride).Result;
        }

        [HttpGet]
        [Route("offered")]
        public APIResponse<List<Ride>> GetOfferedRides()
        {
            return _rideService.GetOfferedRides();
        }
    }
}


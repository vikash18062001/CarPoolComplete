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
	public class BookRideController : ControllerBase
	{
        private readonly IBookedRideService _rideService;

        public BookRideController(IBookedRideService rideService)
		{
            this._rideService = rideService;
		}

        [HttpPost]
        [Route("book")]
        public APIResponse<string> BookRide(Ride ride)
        {
            return _rideService.BookRide(ride).Result;
        }

        [HttpGet]
        [Route("booked")]
        public APIResponse<List<Ride>> GetBookedRides()
        {
            return _rideService.GetBookedRides();
        }
    }
}


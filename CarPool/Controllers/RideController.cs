using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CarPool.Contracts.Rides;
using CarPool.Concerns;
using CarPool.Providers;

namespace CarPool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("ride")]
    public class RideController : ControllerBase
    {
        private readonly IRideService _rideService;

        public RideController(IRideService rideService)
        {
            this._rideService = rideService;
        }

        [HttpPost]
        [Route("matches")]
        public APIResponse<List<Ride>> GetMatches(Ride ride)
        {
            return _rideService.GetMatchesForRide(ride);
        }
    }
}


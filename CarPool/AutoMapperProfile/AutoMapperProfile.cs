using System;
using AutoMapper;
using CarPool.Concerns;
using CarPool.Contracts.Rides;
using CarPool.Providers;

namespace CarPool.Web.AutoMapperProfile
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile()
		{
			
			CreateMap<OfferedRide, Ride>().
				ForMember(destination => destination.Price, options => options.MapFrom(source => source.PricePerSeat));

			CreateMap<Ride, OfferedRide>().ForMember(destination => destination.PricePerSeat, options => options.MapFrom(source => source.Price)).
				ForMember(destination => destination.Source, options => options.Ignore()).
				ForMember(destination => destination.Destination, options => options.Ignore()).
				ForMember(destination => destination.Stops, options => options.Ignore()).
				ForMember(destination => destination.PricePerSeat , options=>options.MapFrom(source=>source.Price));

        }
	}
}


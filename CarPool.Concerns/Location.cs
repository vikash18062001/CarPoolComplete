using System;
using System.ComponentModel.DataAnnotations;

namespace CarPool.Concerns
{
	public class Location
	{
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public Location()
        {
            this.Name = string.Empty;
        }
    }
}
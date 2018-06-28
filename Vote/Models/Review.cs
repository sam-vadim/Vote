using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vote.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Fam { get; set; }
        public string Im { get; set; }
        public string Ot { get; set; }
        public int Street_id { get; set; }
        public string Home_num { get; set; }
        public string Flat_num { get; set; }
        public string Passport { get; set; }
        public string Content { get; set; }
        public DateTime Date_insert { get; set; }
    }
}

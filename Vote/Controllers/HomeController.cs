using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vote.Models;
using Vote.DBContext;

namespace Vote.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(StreetContext.AllStreets());
        }
        [HttpPost]
        public IActionResult Add([FromBody] Review review)
        {
            if (ReviewContext.CheckPassport(review.Passport)!=0) return StatusCode(400);

            if (ReviewContext.Add(review)) return StatusCode(200);

            return StatusCode(404);
        }
    }
}

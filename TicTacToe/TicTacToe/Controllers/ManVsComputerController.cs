using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicTacToe.Models;

namespace TicTacToe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManVsComputerController : ControllerBase
    {
        private readonly ComputerMove _obj;
        public ManVsComputerController()
        {
            _obj = new ComputerMove();
        }
        [HttpPost("set")]
        public IActionResult set(string location)
        {
            Console.WriteLine(location);
            _obj.set(location.Trim());
            return Ok();
        }
        [HttpGet("get")]
        public IActionResult get()
        { 
            Dictionary<string, string> map = new Dictionary<string, string>();
            map["Id"] = _obj.get();
            return Ok(map);
        }
    }
}

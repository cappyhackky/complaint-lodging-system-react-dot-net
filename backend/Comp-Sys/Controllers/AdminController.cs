using Comp_Sys.DAL;
using Comp_Sys.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Comp_Sys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AdminController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [HttpPost]
        [Route("register-JE")]
        public Response<AdminModel> RegisterJE(AdminModel model)
        {
            Response<AdminModel> response = new Response<AdminModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            AdminDAL dal = new AdminDAL();
            response = dal.RegisterJE(model, conn);
            return response;
        }
        [HttpGet]
        [Route("get-admins")]
        public Response<AdminModel> GetAdmins()
        {
            Response<AdminModel> response = new Response<AdminModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            AdminDAL dal = new AdminDAL();
            response = dal.GetAdmins(conn);
            return response;
        }
        [HttpPost]
        [Route("login")]
        public Response<AdminModel> AdminLogin(string AdminId, string AdminPass)
        {
            Response<AdminModel> response = new ();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            AdminDAL dal = new ();
            response = dal.AdminLogin(AdminId, AdminPass, conn);
            return response;
        }
    }
}

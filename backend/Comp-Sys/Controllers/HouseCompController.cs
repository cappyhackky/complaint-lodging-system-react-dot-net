using Comp_Sys.DAL;
using Comp_Sys.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Comp_Sys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseCompController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HouseCompController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("register")]
        public Response<HomeCompModel> Register(HomeCompModel model)
        {
            Response<HomeCompModel> response = new();
            HomeCompDAL dal = new HomeCompDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.Register(model, conn);
            return response;
        }
        [HttpGet]
        [Route("get-comp-list")]
        public Response<HomeCompModel> GetComplaints()
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            HomeCompDAL dal = new HomeCompDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.GetComplaints(conn);
            return response;
        }
        [HttpGet]
        [Route("get-complaint/{complaintId}")]
        public Response<HomeCompModel> GetComplaintById(string complaintId)
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            HomeCompDAL dal = new HomeCompDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.GetComplaintById(complaintId, conn);
            return response;
        }
        [HttpPost]
        [Route("update-complaint/{complaintId}/{status}")]
        public Response<HomeCompModel> UpdateComplaint(string complaintId, string status)
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HomeCompDAL dal = new HomeCompDAL();
            response = dal.UpdateStatus(complaintId, status, conn);
            return response;
        }
    }
}

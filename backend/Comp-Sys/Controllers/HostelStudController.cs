using Comp_Sys.DAL;
using Comp_Sys.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Comp_Sys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostelStudController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public HostelStudController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("register")]
        public Response<HostelStudModel> Register(HostelStudModel model)
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HostelStudDAL dal = new HostelStudDAL();
            response = dal.Register(model, conn);
            return response;
        }
        [HttpGet]
        [Route("get-comp-list")]
        public Response<HostelStudModel> GetComplaints()
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HostelStudDAL dal = new HostelStudDAL();
            response = dal.GetComplaints(conn);
            return response;
        }
        [HttpGet]
        [Route("get-complaint/{complaintId}")]
        public Response<HostelStudModel> GetComplaintById(string complaintId)
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HostelStudDAL dal = new HostelStudDAL();
            response = dal.GetComplaintById(complaintId, conn);
            return response;
        }
        [HttpPost]
        [Route("update-complaint/{complaintId}/{status}")]
        public Response<HostelStudModel> UpdateComplaint(string complaintId, string status)
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HostelStudDAL dal = new HostelStudDAL();
            response = dal.UpdateStatus(complaintId, status, conn);
            return response;
        }
    }
}

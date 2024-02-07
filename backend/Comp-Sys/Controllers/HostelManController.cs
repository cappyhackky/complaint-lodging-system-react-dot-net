using Comp_Sys.DAL;
using Comp_Sys.Essentials;
using Comp_Sys.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Comp_Sys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostelManController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HostelManController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("register")]
        public Response<HostelManModel> Register (HostelManModel model)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            HostelManDAL dal = new HostelManDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.Register(model, conn);
            return response;
        }
        [HttpGet]
        [Route("get-comp-list")]
        public Response<HostelManModel> GetComplaints()
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            HostelManDAL dal = new HostelManDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.GetComplaints(conn);
            return response;
        }
        [HttpGet]
        [Route("get-complaint/{complaintId}")]
        public Response<HostelManModel> GetComplaintById(string complaintId)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            HostelManDAL dal = new HostelManDAL();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            response = dal.GetComplaintById(complaintId, conn);
            return response;
        }
        [HttpPost]
        [Route("update-complaint/{complaintId}/{status}")]
        public Response<HostelManModel> UpdateComplaint(string complaintId, string status)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("conStr").ToString());
            HostelManDAL dal = new HostelManDAL();
            response = dal.UpdateStatus(complaintId, status, conn);
            return response;
        }
        [HttpPost]
        [Route("get-hash")]
        public string GetHash(string password)
        {
            PasswordManager passwordManager = new PasswordManager();
            string hash = passwordManager.HashGenerator(password);
            return hash;
        }
        [HttpPost]
        [Route("verify-hash")]
        public bool Verify(string password, string hashPassword)
        {
            PasswordManager passwordManager = new PasswordManager();
            bool hash = passwordManager.ValidatePassword(password, hashPassword);
            return hash;
        }
    }
}

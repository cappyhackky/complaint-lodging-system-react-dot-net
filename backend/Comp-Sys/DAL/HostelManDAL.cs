using Comp_Sys.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Comp_Sys.DAL
{
    public class HostelManDAL
    {
        public Response<HostelManModel> Register(HostelManModel Model, SqlConnection conn)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            SqlCommand cmd = new SqlCommand("sp_setHstlManComp", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@type", Model.Type);
            cmd.Parameters.AddWithValue("@hstlnm", Model.HostelName);
            cmd.Parameters.AddWithValue("@cmpnm", Model.CompName);
            cmd.Parameters.AddWithValue("@severity", Model.Severity);
            cmd.Parameters.AddWithValue("@phno", Model.PhoneNo);
            cmd.Parameters.AddWithValue("@desc", Model.Desc);
            SqlParameter complaintNumberParam = new SqlParameter("@complaintNumber", SqlDbType.VarChar, 20);
            complaintNumberParam.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(complaintNumberParam);
            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
            if (i > 0)
            {
                response.MiscData = complaintNumberParam.Value.ToString();
                response.StatusCode = 200;
                response.StatusMessage = "OK";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Complaint registration failed";
            }
            return response;
        }
        public Response<HostelManModel> GetComplaints(SqlConnection conn)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            try
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("sp_GetManComp", conn))
                {   
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            HostelManModel comp = new HostelManModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hstmn_id")),
                                Type = reader.GetString(reader.GetOrdinal("hstmn_typ")),
                                HostelName = reader.GetString(reader.GetOrdinal("hstmn_hstnm")),
                                CompName = reader.GetString(reader.GetOrdinal("hstmn_cmpnm")),
                                Severity = reader.GetString(reader.GetOrdinal("hstmn_svr")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hstmn_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hstmn_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hstmn_crdt")),
                                Status = reader.GetString(reader.GetOrdinal("hstmn_stat"))
                            };
                            response.ListData?.Add(comp);
                        }
                    }
                }
                response.StatusCode = 200;
                response.StatusMessage = "OK";
            }
            catch(Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }
            finally
            {
                conn.Close();
            }
            return response;
        }
        public Response<HostelManModel> GetComplaintById(string ComplaintId, SqlConnection conn)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            try
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("sp_GetManCompById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@complaintId", ComplaintId);
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            HostelManModel comp = new HostelManModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hstmn_id")),
                                Type = reader.GetString(reader.GetOrdinal("hstmn_typ")),
                                HostelName = reader.GetString(reader.GetOrdinal("hstmn_hstnm")),
                                CompName = reader.GetString(reader.GetOrdinal("hstmn_cmpnm")),
                                Severity = reader.GetString(reader.GetOrdinal("hstmn_svr")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hstmn_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hstmn_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hstmn_crdt"))
                            };
                            response.RespData = comp;
                            response.StatusMessage = "OK";
                            response.StatusCode = 200;
                        }
                        else
                        {
                            response.StatusMessage = "Complaint Not Found";
                            response.StatusCode = 404;
                        }
                    }
                }
            }catch(Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }
            return response;
        }
        public Response<HostelManModel> UpdateStatus(string CompliantId, string Status, SqlConnection conn)
        {
            Response<HostelManModel> response = new Response<HostelManModel>();
            try
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("sp_updateHostelMan", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("id", CompliantId);
                    cmd.Parameters.AddWithValue("status", Status);
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "Complaint Status Updated!";
                    }
                    else
                    {
                        response.StatusCode = 300;
                        response.StatusMessage = "Status Update failed!";
                    }
                }
            }catch(Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = ex.Message;
            }
            finally
            {
                conn.Close();
            }
            return response;
        }
    }
}

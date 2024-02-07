using Comp_Sys.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Comp_Sys.DAL
{
    public class HostelStudDAL
    {
       public Response<HostelStudModel> Register(HostelStudModel Model, SqlConnection conn)
        {
                Response<HostelStudModel> response = new Response<HostelStudModel>();
            try
            {
                SqlCommand cmd = new SqlCommand("sp_setHstlStudComp", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@hstlnm", Model.HostelName);
                cmd.Parameters.AddWithValue("@rmno", Model.RoomNo);
                cmd.Parameters.AddWithValue("@wgno", Model.WingNo);
                cmd.Parameters.AddWithValue("@cmpnm", Model.CompName);
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
            }catch(Exception ex)
            {
                response.StatusMessage=ex.Message;
                response.StatusCode=500;
                return response;
            }
        }
       public Response<HostelStudModel> GetComplaints(SqlConnection conn)
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            try
            {
                conn.Open ();
                using(SqlCommand cmd = new SqlCommand("sp_GetStudComp", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            HostelStudModel comp = new HostelStudModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hstst_id")),
                                HostelName = reader.GetString(reader.GetOrdinal("hstst_hstnm")),
                                RoomNo = reader.GetInt32(reader.GetOrdinal("hstst_rmno")),
                                WingNo = reader.GetInt32(reader.GetOrdinal("hstst_wgno")),
                                CompName = reader.GetString(reader.GetOrdinal("hstst_cmpnm")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hstst_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hstst_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hstst_crdt")),
                                Status = reader.GetString(reader.GetOrdinal("hstst_stat"))
                            };
                            response.ListData?.Add(comp);

                        }
                        response.StatusCode = 200;
                        response.StatusMessage = "OK";
                    }
                }
            }
            catch(Exception ex) {
                response.StatusCode = 100;
                response.StatusMessage=ex.Message;
            }
            return response;
        } 
       public Response<HostelStudModel> GetComplaintById(string CompaintId, SqlConnection conn) {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            try
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("sp_GetStudCompById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@complaintId", CompaintId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read()) {
                            HostelStudModel comp = new HostelStudModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hstst_id")),
                                HostelName = reader.GetString(reader.GetOrdinal("hstst_hstnm")),
                                RoomNo = reader.GetInt32(reader.GetOrdinal("hstst_rmno")),
                                WingNo = reader.GetInt32(reader.GetOrdinal("hstst_wgno")),
                                CompName = reader.GetString(reader.GetOrdinal("hstst_cmpnm")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hstst_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hstst_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hstst_crdt")),
                                Status = reader.GetString(reader.GetOrdinal("hstst_stat"))
                            };
                            response.StatusCode = 200;
                            response.StatusMessage = "OK";
                            response.RespData = comp;
                        }
                        else
                        {
                            response.StatusCode = 400;
                            response.StatusMessage = "Complaint not found";
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }
            return response;
       } 
       public Response<HostelStudModel> UpdateStatus(string ComplaintId, string Status, SqlConnection conn)
        {
            Response<HostelStudModel> response = new Response<HostelStudModel>();
            try 
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("sp_updateHostelStud", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("id", ComplaintId);
                    cmd.Parameters.AddWithValue("status", Status);
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage= "Complaint Status Updated!";
                    }
                    else
                    {
                        response.StatusCode = 300;
                        response.StatusMessage = "Status Update failed!";
                    }
                }
            }
            catch(Exception ex)
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

using Comp_Sys.Controllers;
using Comp_Sys.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.SqlClient;

namespace Comp_Sys.DAL
{
    public class HomeCompDAL
    {
        public Response<HomeCompModel> Register(HomeCompModel comp, SqlConnection conn)
        {

            Response<HomeCompModel> response = new();
            SqlCommand cmd = new SqlCommand("sp_setHouseComp", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@type", comp.Type);
            cmd.Parameters.AddWithValue("@houseno", comp.HouseNo);
            cmd.Parameters.AddWithValue("@cmpnm", comp.CompName);
            cmd.Parameters.AddWithValue("@severity", comp.Severity);
            cmd.Parameters.AddWithValue("@phno", comp.PhoneNo);
            cmd.Parameters.AddWithValue("@desc", comp.Desc);
            SqlParameter complaintNumberParam = new SqlParameter("@complaintNumber", SqlDbType.VarChar, 20);
            complaintNumberParam.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(complaintNumberParam);
            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
            if (i>0)
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
        public Response<HomeCompModel> GetComplaints(SqlConnection con)
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            try
            {

                con.Open();
                using (SqlCommand cmd = new SqlCommand("sp_GetHouseComp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            HomeCompModel comp = new HomeCompModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hscmp_id")),
                                Type = reader.GetString(reader.GetOrdinal("hscmp_typ")),
                                HouseNo = reader.GetString(reader.GetOrdinal("hscmp_hsno")),
                                CompName = reader.GetString(reader.GetOrdinal("hscmp_cmpnm")),
                                Severity = reader.GetString(reader.GetOrdinal("hscmp_svr")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hscmp_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hscmp_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hscmp_crdt")),
                                status = reader.GetString(reader.GetOrdinal("hscmp_stat"))
                            };
                            response.ListData?.Add(comp);
                        }
                    }
                }
                
                response.StatusCode = 200;
                response.StatusMessage = "OK";
            }
            catch (Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return response;
        }
        public Response<HomeCompModel> GetComplaintById(string ComplaintId, SqlConnection con)
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            try
            {

                con.Open();
                using (SqlCommand cmd = new SqlCommand("sp_GetHouseCompById", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@complaintId", ComplaintId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if(reader.Read())
                        {
                            HomeCompModel comp = new HomeCompModel
                            {
                                Id = reader.GetString(reader.GetOrdinal("hscmp_id")),
                                Type = reader.GetString(reader.GetOrdinal("hscmp_typ")),
                                HouseNo = reader.GetString(reader.GetOrdinal("hscmp_hsno")),
                                CompName = reader.GetString(reader.GetOrdinal("hscmp_cmpnm")),
                                Severity = reader.GetString(reader.GetOrdinal("hscmp_svr")),
                                PhoneNo = reader.GetString(reader.GetOrdinal("hscmp_phno")),
                                Desc = reader.GetString(reader.GetOrdinal("hscmp_desc")),
                                CreatedOn = reader.GetDateTime(reader.GetOrdinal("hscmp_crdt")),
                                status = reader.GetString(reader.GetOrdinal("hscmp_stat"))
                            };
                            response.StatusCode = 200;
                            response.StatusMessage = "OK";
                            response.RespData = comp;
                        }
                        else
                        {
                            response.StatusCode = 404;
                            response.StatusMessage = "Complaint does not exist";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return response;
        }
        public Response<HomeCompModel> UpdateStatus(string ComplaintId, string Status, SqlConnection conn)
        {
            Response<HomeCompModel> response = new Response<HomeCompModel>();
            try
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("sp_updateHouse", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("id", ComplaintId);
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
            }
            catch (Exception ex)
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

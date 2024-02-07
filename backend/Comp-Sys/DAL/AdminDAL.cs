using Comp_Sys.Essentials;
using Comp_Sys.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.Identity.Client;

namespace Comp_Sys.DAL
{
    public class AdminDAL
    {
        public Response<AdminModel> RegisterJE(AdminModel admin, SqlConnection conn)
        {
            Response<AdminModel> response = new Response<AdminModel>();
            PasswordManager passwordManager = new PasswordManager();
            try
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("sp_registerJE", conn))
                {
                    string hashPassword = passwordManager.HashGenerator(admin.AdminPassword);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@name", admin.AdminName);
                    cmd.Parameters.AddWithValue("@type", admin.AdminType);
                    cmd.Parameters.AddWithValue("@email", admin.AdminEmail);
                    cmd.Parameters.AddWithValue("@designation", admin.AdminDesignation);
                    cmd.Parameters.AddWithValue("@phno", admin.AdminPhNo);
                    cmd.Parameters.AddWithValue("@password", hashPassword);
                    SqlParameter AdminID = new SqlParameter("@adm_id", SqlDbType.VarChar, 50);
                    AdminID.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(AdminID);
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        response.MiscData = AdminID.Value.ToString();
                        response.StatusCode = 200;
                        response.StatusMessage = "OK";
                    }
                    else
                    {
                        response.StatusCode = 100;
                        response.StatusMessage = "User registration failed";
                    }
                    return response;
                }
            }catch (Exception ex)
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
        public Response<AdminModel> GetAdmins(SqlConnection conn) 
        {
            Response<AdminModel> response = new Response<AdminModel>();
            try
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("Select * from admin_tbl", conn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            AdminModel admin = new AdminModel 
                            {
                                AdminId = reader.GetString(reader.GetOrdinal("adm_id")),
                                AdminName = reader.GetString(reader.GetOrdinal("adm_name")),
                                AdminType = reader.GetString(reader.GetOrdinal("adm_type")),
                                AdminEmail = reader.GetString(reader.GetOrdinal("adm_email")),
                                AdminDesignation = reader.GetString(reader.GetOrdinal("adm_dsgn")),
                                AdminPhNo = reader.GetString(reader.GetOrdinal("adm_phno")),
                                AdminPassword = reader.GetString(reader.GetOrdinal("adm_pass"))
                            };
                            response.RespData = admin;
                        }
                    }
                };
                response.StatusMessage = "OK";
                response.StatusCode = 200;
            }
            catch (Exception ex)
            {
                response.StatusCode = 100;
                response.StatusMessage = ex.Message;
            }finally { conn.Close(); }
            return response; 
        }
        public Response<AdminModel> AdminLogin(string AdminId ,string AdminPass, SqlConnection conn)
        {
            Response<AdminModel> response = new Response<AdminModel>();
            PasswordManager passwordManager = new PasswordManager();
            try
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("Select * from admin_tbl where adm_id = @AdminId", conn))
                {
                    cmd.Parameters.AddWithValue("@AdminId", AdminId);
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            AdminModel admin = new AdminModel
                            {
                                AdminId = reader.GetString(reader.GetOrdinal("adm_id")),
                                AdminName = reader.GetString(reader.GetOrdinal("adm_name")),
                                AdminType = reader.GetString(reader.GetOrdinal("adm_type")),
                                AdminEmail = reader.GetString(reader.GetOrdinal("adm_email")),
                                AdminDesignation = reader.GetString(reader.GetOrdinal("adm_dsgn")),
                                AdminPhNo = reader.GetString(reader.GetOrdinal("adm_phno")),
                                AdminPassword = reader.GetString(reader.GetOrdinal("adm_pass")),
                            };
                            /*response.RespData = admin;
                            response.StatusMessage = "OK";
                            response.StatusCode = 200;*/
                            bool isValid = passwordManager.ValidatePassword(AdminPass, admin.AdminPassword);
                            if (isValid)
                            {
                                admin.AdminPassword = null;
                                response.RespData = admin;
                                response.StatusMessage = "OK";
                                response.StatusCode = 200;
                            }
                            else
                            {
                                response.StatusMessage = "Invalid Password";
                                response.StatusCode = 403;
                            }
                        }
                        else
                        {
                            response.StatusCode = 404;
                            response.StatusMessage = "Invalid UserName/Password!";
                        }
                        
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

import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../utils/AuthContext';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const navigate = useNavigate();
  const {logIn} = useAuth();
  const handleLogin = async(e) => {
    if (adminId === '' || adminPass === '') {
      toast.error("Fields cannot be left empty !",{
        position : "top-right"
      })
      return
    }else{
      await fetch(`https://localhost:7004/api/Admin/login?AdminId=${adminId}&AdminPass=${adminPass}`, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'}
      }).then(response=>{
        if (!response.ok) {
          throw new Error("Network response was not Ok");
        }
        return (response.json());
      }).then(result=>{
        if (result.statusCode === 200) {
          logIn(result.respData);
          navigate('/adminDB');
        }else if(result.statusCode === 403){
          toast.warning("Invalid Credentials!",{
            position : "top-right"
          })
        }else if(result.statusCode === 404){
          toast.error(result.statusMessage,{
            position : "top-right"
          })
        }
      });
    }
  }
  useEffect(() => {
    document.title = 'Login';
  });
  return (
    <>
    <ToastContainer/>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form method="post" className='mx-auto col-lg-4 col-md-8 col-10'>
        <div className="form-group">
          <label className="form-label ms-2 mt-2">User ID</label>
          <input id='adminId' type="text" className="form-control" placeholder="Admin ID" onChange={(e)=>setAdminId(e.target.value)}/>
        </div>
        <div className="form-group">
          <label className="form-label ms-2 mt-2">Password</label>
          <input id='password' type="password" className="form-control" placeholder="Password" onChange={(e)=>{setAdminPass(e.target.value)}}/>
        </div>
        <div className="w-100 text-center mt-3 d-flex justify-content-around">
          <button type="button" id="formSubmit" className="btn btn-primary px-5" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default AdminLogin;
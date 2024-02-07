import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { FaSignOutAlt } from 'react-icons/fa'
import { BiUser, BiCheckShield } from 'react-icons/bi'
import { useAuth } from '../utils/AuthContext';
import ProfileComp from './partials/ProfileComp';
import { useNavigate } from 'react-router-dom';
import Complaint from './Complaint';
// import AssignJE from './partials/AssignJE';
import RegisterJE from './partials/RegisterJE';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuth, user, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [compList, setCompList] = useState([]);

  const handleComp = async (type) => {
    try {
      const complaint = await getStatus(`https://localhost:7004/api/${type}/get-comp-list`);
      if (complaint) {
        setCompList(complaint);
        setActiveTab("complaint");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleGenComp = (adminType)=>{
    switch(adminType){
      case 'Ss':
        handleComp("HouseComp");
        break;
      case 'SA':
        handleComp("HostelStud");
        break;
      case 'SdA':
        handleComp("HostelMan");
        break;
      default:
        return null;

    }
  }
  const getStatus = async (apiLink) => {
    try {
      const response = await fetch(apiLink, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error("Network response was not Ok");
      }
      const result = await response.json();

      if (result.statusCode === 404) {
        toast.error(result.statusMessage, {
          position: 'top-right'
        });
      } else {
        const compList = result.listData.map((e) => {
          return ({
            id: e.id,
            compName: e.compName,
            createdOn: e.createdOn,
            status: e.status
          })
        });
        return compList;
      }
    } catch (error) {
      navigate('/error404');
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }

  const getComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileComp user={user} />
      case 'complaint':
        return <Complaint data={compList} />
      case 'HandleJE':
        return <RegisterJE />
      default:
        return null;
    }
  };
  useEffect(()=>{
    document.title = "Admin Dashboard"
  })
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     console.log(isAuth);
  //     if (!isAuth) {
  //       navigate('/login')
  //     }
  //   }
  //   if(isAuth !== null && isAuth !== undefined){
  //     checkAuth();
  //   }
  // }, [isAuth, navigate])
  return (
    <>
      <ToastContainer />
      <div className="row g-0 flex-grow-1">
        <div className="col-lg-2 bg-teal text-light d-flex justify-content-center flex-column py-5 vh-100">
          <div className="d-flex justify-content-center p-2 py-5">
            <ul className="nav flex-column">
              <li className="nav-item">
                <div className="h5"> <span className="mt-5">{user.adminName || 'Name'}</span></div>
              </li>
              <hr />
              <li className="nav-item hover">
                <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleTabClick("profile") }}><BiUser /> Profile</a>
              </li>
              <hr />
              {(user.adminType === 'SA') ?
              // {(user.adminType === undefined) ?
                <>
                  <li className="nav-item hover">
                    <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleComp('HouseComp') }}><BiCheckShield /> House Complaints</a>
                  </li>
                  <hr />
                  <li className="nav-item hover">
                    <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleComp('HostelStud') }}><BiCheckShield /> Hostel Complaints (Student)</a>
                  </li>
                  <hr />
                  <li className="nav-item hover">
                    <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleComp('HostelMan') }}><BiCheckShield /> Hostel Complaints (Manager)</a>
                  </li>
                  <hr />
                  {/* <li className="nav-item hover">
                    <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleTabClick("HandleJE") }}><BiCheckShield /> Register JE</a>
                  </li> */}
                  {/* <hr /> */}
                </>

                :
                <>
                  <li className="nav-item hover">
                    <a href="#component" className="h6 text-decoration-none" role="button" onClick={() => { handleGenComp(user.adminType) }}><BiCheckShield /> View Complaints</a>
                  </li>
                  <hr />
                </>
              }
              <li className="nav-item hover">
                <a href='/login' className="h6 text-decoration-none" role="button" onClick={logOut}><span className="hover">Logout <FaSignOutAlt /></span></a>
              </li>
            </ul>
          </div>
        </div>
        <div id="component" className="mx-auto col-lg-9 col-12 d-flex justify-content-center py-5">
          <div className="my-5 p-3">
            {getComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
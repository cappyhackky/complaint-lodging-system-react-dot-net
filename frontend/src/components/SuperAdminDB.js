import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {useAuth} from '../utils/AuthContext'

const SuperAdminDB = () => {
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const handleStudClick = () => {
    getStatus('https://localhost:7004/api/HostelStud/get-comp-list');
  }
  const handleManClick = () => {
    getStatus('https://localhost:7004/api/HostelMan/get-comp-list');
  }
  const handleHouseClick = () => {
    getStatus('https://localhost:7004/api/HouseComp/get-comp-list');
  }
  const handleJEClick = () => {
    navigate('/')
  }

  const getStatus = async (apiLink) => {
    await fetch(apiLink, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not Ok");
      }
      return (response.json());
    }).then(result => {
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
        navigate('/complaint', { state: { data: compList } });
      }
    }).catch(error => {
      navigate('/error404');
      console.error(error);
    });
  }
  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
  },[])

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container p-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card border-primary shadow mb-3">
                <div className="card-body text-dark">
                  <div className="row" role='button' onClick={handleManClick}>
                    <div className="col-md-4"><img src="/img/manager.png" className='img-fluid' alt='View Complaint' /></div>
                    <div className="col-md-8 d-flex align-items-center"><p className='h3'>Hostel Complaint (Manager)</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-primary shadow mb-3">
                <div className="card-body text-dark">
                  <div className="row" role='button' onClick={handleStudClick}>
                    <div className="col-md-4"><img src="/img/hostel.png" className='img-fluid' alt='add-user' /></div>
                    <div className="col-md-8 d-flex align-items-center"><p className='h3'>Hostel Complaint (Student)</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card border-primary shadow mb-3">
                <div className="card-body text-dark">
                  <div className="row" role='button' onClick={handleHouseClick}>
                    <div className="col-md-4"><img src="/img/home.png" className='img-fluid' alt='View Complaint' /></div>
                    <div className="col-md-8 d-flex align-items-center"><p className='h3'>House Complaint</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-primary shadow mb-3">
                <div className="card-body text-dark">
                  <div className="row" role='button' onClick={handleJEClick}>
                    <div className="col-md-4"><img src="/img/engineer.png" className='img-fluid' alt='add-user' /></div>
                    <div className="col-md-8 d-flex align-items-center"><p className='h3'>Assign JE and Other Options</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuperAdminDB
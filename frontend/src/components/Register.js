import { React, useState } from 'react';
import CompHouse from './partials/CompHouse';
import HostelMan from './partials/HostelMan';
import HostelStud from './partials/HostelStud';
import { FaHome, FaHotel, FaUser } from 'react-icons/fa'

const Register = () => {
  const [activeTab, setActiveTab] = useState('CompHome');
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }
  
  const getComponent = () => {
    switch (activeTab) {
      case 'CompHome':
        return <CompHouse />;
      case 'HostelMan':
        return <HostelMan />;
      case 'HostelStud':
        return <HostelStud />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid row g-0">
          <div className="col-lg-2 bg-teal d-flex justify-content-center align-items-center vh-100">
            <ul className="nav flex-column my-5 py-5">
              <li className="nav-item hover">
                <a href="#component" className='text-decoration-none'>
                  <p className='h5 text-light' role='button' onClick={() => { handleTabClick('CompHome') }}><FaHome /><span className='p-1 mt-2'>House</span></p>
                </a>
                <hr className='text-light' />
              </li>
              <li className="nav-item hover">
                <a href="#component" className='text-decoration-none'>
                  <p className='h5 text-light' role='button' onClick={() => { handleTabClick('HostelMan') }}><FaUser /><span className='p-1 mt-2'>Hostel (Manager)</span></p>
                </a><hr className='text-light' />
              </li>
              <li className="nav-item hover">
                <a href="#component" className='text-decoration-none'>
                  <p className='h5 text-light' role='button' onClick={() => { handleTabClick('HostelStud') }}><FaHotel /><span className='p-1 mt-2'>Hostel (Student)</span></p>
                </a>
                <hr className='text-light' />
              </li>
            </ul>
          </div>
          <div className="mx-auto col-lg-8 col-12 d-flex justify-content-center align-items-center">
            <div id="component" className="my-5 p-3 py-5">
              {getComponent()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
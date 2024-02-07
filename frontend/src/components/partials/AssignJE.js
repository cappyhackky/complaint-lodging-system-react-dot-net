import React, { useEffect, useState } from 'react'

const AssignJE = () => {
  const [activeTab, setActiveTab] = useState('home');
  const handleStateChange = (state) => {
    setActiveTab(state)
  }
  const resetState = () => {
    setActiveTab('home')
  }
  useEffect(() => {
   
  }, [])
  return (
    <>
      <div className="container py-5">
        {activeTab === 'home' && <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="card hover border-primary">
              <div className="card-body">
                <div className="row" role="button" onClick={()=>{handleStateChange('registerJE')}}>
                  <div className="col-sm-12 col-lg-6 text-center">
                    <img className="img-fluid" src="/img/addUser.png" alt="" />
                  </div>
                  <div className="col-sm-12 col-lg-6 d-flex align-items-center justify-content-center"><p className="h3 ">Register JE</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 hover">
            <div className="card border-primary">
              <div className="card-body">
                <div className="row" role="button" onClick={()=>{handleStateChange('assignJE')}}>
                  <div className="col-sm-12 col-lg-6 text-center">
                    <img className="img-fluid" src="/img/engineer.png" alt="" />
                  </div>
                  <div className="col-sm-12 col-lg-6 d-flex align-items-center justify-content-center"><p className="h3" >Assign JE</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>}
        {activeTab === 'registerJE' && <p role="button">RegisterJE</p>}
        {activeTab === 'assignJE' && <p role="button">AssignJE</p>}
      </div>
    </>
  )
}

export default AssignJE
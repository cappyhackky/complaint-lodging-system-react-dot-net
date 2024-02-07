import { React, useState } from 'react'
import CompHouse from './partials/CompHouse'
import HostelMan from './partials/HostelMan'
import HostelStud from './partials/HostelStud'

const Register = () => {
  const [activeTab, setActiveTab] = useState('CompHome');
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }
  return (
    <>
      <div className="row w-100 g-0">
        <div className="col-4 p-0">
          <img className='img-fluid cover' src="/img/dashComp.jpg" alt="" />
        </div>
        <div className="h-100 p-3 bg-opacity-25 col-8 d-flex align-items-center flex-column">
          <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${(activeTab === 'CompHome') ? 'active' : ''}`} id="home-tab" data-bs-toggle="tab" data-bs-target="#CompHome" type="button" role="tab" aria-controls="CompHome" aria-selected="true" onClick={()=>{handleTabClick('CompHome')}}>House</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${(activeTab === 'HostelMan') ? 'active' : ''}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#HostelMan" type="button" role="tab" aria-controls="compHostel" aria-selected="false" onClick={()=>{handleTabClick('HostelMan')}}>Hostel (Manager)</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${(activeTab === 'HostelStud') ? 'active' : ''}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#HostelStud" type="button" role="tab" aria-controls="compHostel" aria-selected="false" onClick={()=>{handleTabClick('HostelStud')}}>Hostel (Student)</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className={`tab-pane fade ${activeTab === 'CompHome'?'show active':''}`}
              id='CompHome' role="tabpanel"
              aria-labelledby='CompHome-tab'
            ><CompHouse/>
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'HostelMan'?'show active':''}`}
              id='HostelMan' role="tabpanel"
              aria-labelledby='CompHome-tab'
            ><HostelMan/>
            </div>
            <div
              className={`tab-pane fade ${activeTab === 'HostelStud'?'show active':''}`}
              id='HostelStud' role="tabpanel"
              aria-labelledby='CompHome-tab'
            ><HostelStud/>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register




// import { React } from 'react';
// import CompHouse from './partials/CompHouse';
// import HostelMan from './partials/HostelMan';
// import HostelStud from './partials/HostelStud';
// import { removeValidation } from '../utils/formValidation';

// const Register = () => {
//   return (
//     <>
    
    
//       <div className="row g-0 d-flex align-items-center justify-content-center">
//       <div className="col-12 col-lg-4 p-0 bg-dark h-100">
//           {/* <img className='img-fluid' src="/img/dashComp.jpg" alt="" /> */}
//           <p>sdfdsf</p>
//         </div>
//         <div className="p-3 bg-opacity-25 col-12 col-lg-8 d- flex align-items-center justify-content-center flex-column">
//           <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
//             <li className="nav-item" role="presentation">
//               <div className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#comphome" type="button" role="tab" aria-controls="comphome" aria-selected="true" onClick={removeValidation}>House</div>
//             </li>
//             <li className="nav-item" role="presentation">
//               <div className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#HostelMan" type="button" role="tab" aria-controls="compHostel" aria-selected="false" onClick={removeValidation}>Hostel (Manager)</div>
//             </li>
//             <li className="nav-item" role="presentation">
//               <div className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#HostelStud" type="button" role="tab" aria-controls="compHostel" aria-selected="false" onClick={removeValidation}>Hostel (Student)</div>
//             </li>
//           </ul>
//           <div className="tab-content" id="myTabContent">
//             <div className="tab-pane fade show active" id="comphome" role="tabpanel" aria-labelledby="comphome-tab"><CompHouse /></div>
//             <div className="tab-pane fade" id="HostelMan" role="tabpanel" aria-labelledby="compHostel-tab"><HostelMan /></div>
//             <div className="tab-pane fade" id="HostelStud" role="tabpanel" aria-labelledby="compHostel-tab"><HostelStud /></div>
//           </div>
//         </div>
//       </div>
//     </>

//   )
// }

// export default Register
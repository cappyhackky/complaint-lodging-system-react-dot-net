import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { validateRequired, validatePhone } from '../../utils/formValidation';
import Modal from './Modal';

const HostelStud = () => {
  const [hostelName, setHostelName] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [wingNo, setWingNo] = useState('');
  const [compName, setCompName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [desc, setDesc] = useState('');
  const data = {
    hostelName, roomNo, wingNo, compName, phoneNo, desc
  }
  const [complaintNo, setComplaintNo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const validateForm = () => {
    const requiredFields = ['studHostel', 'studRmNo', 'wingNo', 'studName', 'studPhNo'];
    const phoneInput = document.getElementById('studPhNo');
    validateRequired(requiredFields);
    validatePhone(phoneInput, phoneInput.value);
    return document.querySelector('.is-invalid') === null;
  }
  const Register = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await fetch('https://localhost:7004/api/HostelStud/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log(response.statusCode);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast.success('Registration successful', {
          position: 'top-right',
        });
        setHostelName('');
        setRoomNo('');
        setWingNo('');
        setCompName('');
        setPhoneNo('');
        setDesc('');
        return (response.json());
      }).then((result) => {
        console.log(result);
        setComplaintNo(result.complaintNo);
        setShowModal(true);
      }).catch(error => {
        console.error(error);
        toast.error('Registration Failed', {
          position: 'top-right',
        });
      })
    } else {
      toast.error('Form Fields are invalid', {
        position: 'top-right',
      });
      console.log("Student Part");
    }
  }
  
  return (
    <>
      <ToastContainer />
      {/* <button className='btn btn-primary' onClick={handleModal}></button> */}
      {showModal && (<Modal
        showModal={showModal}
        title='Complaint registered successfully'
        handleCloseModal={handleCloseModal}
        message={`Complaint No is `}
        Misc={complaintNo}
      />)}
      <form method='POST'>

        <div className="row">
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Hostel</label>
            <input id='studHostel' type="text" className="form-control" placeholder="Hostel Name" value={hostelName} onChange={(e) => { setHostelName(e.target.value) }} />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="form-group col-sm-6">
                <label className="form-label ms-2 mt-2">Room No.</label>
                <input type="text" id='studRmNo' className="form-control" placeholder="Room Number" value={roomNo} onChange={(e) => { setRoomNo(e.target.value) }} />
              </div>
              <div className="form-group col-sm-6">
                <label className="form-label ms-2 mt-2">Wing No.</label>
                <input id='wingNo' type="text" className="form-control" placeholder="Wing No." value={wingNo} onChange={(e) => { setWingNo(e.target.value) }} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Complainee Name</label>
            <input id='studName' type="text" className="form-control" placeholder="Complainee's Name" value={compName} onChange={(e) => { setCompName(e.target.value) }} />
          </div>
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Phone No.</label>
            <input type="tel" id='studPhNo' className="form-control" placeholder="Phone Number" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label ms-2 mt-2">Description</label>
          <textarea type="text" className="form-control" placeholder="Description" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
        </div>

        <div className="mt-3 d-flex justify-content-center w-100"><button type="submit" id="formSubmit" className="btn btn-primary px-5" onClick={Register}>Submit</button></div>
      </form>
    </>
  )
}

export default HostelStud
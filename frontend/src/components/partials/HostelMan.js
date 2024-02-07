import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { validateRequired, validatePhone } from '../../utils/formValidation';
import Modal from './Modal';
import {useNavigate} from 'react-router-dom';
 
const HostelMan = () => {
  const [type, setType] = useState('I')
  const [hostelName, setHostelName] = useState('');
  const [compName, setCompName] = useState('');
  const [severity, setSeverity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [desc, setDesc] = useState('');
  const [complaintNo, setComplaintNo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const data = {
    type, hostelName, compName, severity, phoneNo, desc
  }
  // const handleModal = () => {
  //   setShowModal(true);
  // }
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const validateForm = () => {
    const requiredFields = ['hostelName', 'manName', 'manSeverity', 'manPhNo'];
    const phoneInput = document.getElementById('manPhNo');
    validateRequired(requiredFields);
    validatePhone(phoneInput, phoneInput.value);
    return document.querySelector('.is-invalid') === null;
  }
  const Register = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await fetch('https://localhost:7004/api/HostelMan/register', {
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
        setType('I');
        setHostelName('');
        setCompName('');
        setSeverity('');
        setPhoneNo('');
        setDesc('');
        return (response.json());
      }).then((result) => {
        console.log(result);
        setComplaintNo(result.complaintNo);
        setShowModal(true);
      }).catch(error => {
        console.error(error);
        navigate('/error404');
        toast.error('Registration Failed', {
          position: 'top-right',
        });
      })
    } else {
      toast.error('Form Fields are invalid', {
        position: 'top-right',
      });
      console.log("Manager Part");
    }
  }
  return (
    <>
      <ToastContainer />
      {/* <button className='btn btn-primary' onClick={handleModal}>Load demo modal</button> */}
      {showModal && (<Modal
        showModal = {showModal}
        title = 'Complaint registered successfully'
        handleCloseModal = {handleCloseModal}
        message = {`Complaint No is `}
        Misc = {complaintNo}
      />)}
      <form method="POST">
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="cmpTyp" id="cmpTyp1" value='I' checked={type === 'I'} onChange={(e) => { setType(e.target.value) }} />
            <label className="form-check-label" htmlFor="cmpTyp1">Internal</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="cmpTyp" id="cmpTyp2" value='E' checked={type === 'E'} onChange={(e) => { setType(e.target.value) }} />
            <label className="form-check-label" htmlFor="cmpTyp2">External</label>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Hostel</label>
            <input id='hostelName' type="text" className="form-control" placeholder="Hostel Name" value={hostelName} onChange={(e) => { setHostelName(e.target.value) }} />
          </div>
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Complainee Name</label>
            <input id='manName' type="text" className="form-control" placeholder="Complainee's Name" value={compName} onChange={(e) => { setCompName(e.target.value) }} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Severity</label>
            <select className="form-select mb-3" id='manSeverity' aria-label=".form-select" value={severity} onChange={(e) => { setSeverity(e.target.value) }}>
              <option value="" disabled>Choose option</option>
              <option value="1">Critical</option>
              <option value="2">Marginal</option>
              <option value="3">Negligible</option>
            </select>
          </div>
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Phone No.</label>
            <input type="tel" className="form-control" id='manPhNo' placeholder="Phone Number" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label ms-2 mt-2">Description</label>
          <textarea type="text" className="form-control" placeholder="Description" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
        </div>
        <div className="mt-3 d-flex justify-content-center w-100">
        <button type="submit" id="formSubmit" className="btn btn-primary px-5" onClick={Register}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default HostelMan
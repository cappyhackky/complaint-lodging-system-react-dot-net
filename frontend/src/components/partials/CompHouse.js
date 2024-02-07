import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { validateRequired, validatePhone } from '../../utils/formValidation';
import Modal from './Modal';

const CompHouse = () => {
  useEffect(() => {
    document.title = 'House'
  },[])
  const [complaintNo, setComplaintNo] = useState('');
  const [type, setType] = useState('I');
  const [phase, setPhase] = useState('');
  const [quaterNo, setQuaterNo] = useState('');
  const [subQuaterNo, setSubQuaterNo] = useState('');
  const [compName, setCompName] = useState('');
  const [severity, setSeverity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [desc, setDesc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const houseNo = phase + "/" + quaterNo + "/" + subQuaterNo
  const data = {
    type, houseNo, compName, severity, phoneNo, desc,
  }
  // const handleModal = () => {
  //   setShowModal(true);
  // }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const validateForm = () => {
    const requiredFields = ['phase', 'quaterNo', 'compName', 'severity', 'phNo'];
    const phoneInput = document.getElementById('phNo');
    validateRequired(requiredFields);
    validatePhone(phoneInput, phoneInput.value);
    return document.querySelector('.is-invalid') === null;
  }
  const Register = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await fetch('https://localhost:7004/api/HouseComp/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setType('I');
        setPhase('');
        setQuaterNo('');
        setSubQuaterNo('');
        setCompName('');
        setSeverity('');
        setPhoneNo('');
        setDesc('');
        return (response.json());
      }).then((result) => {
        setComplaintNo(result.miscData);
        setShowModal(true);
        console.log(result);
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
      console.log("House Part");
    }
  }
  return (
    <>
      <ToastContainer />
      {/* <button className='btn btn-primary' onClick={handleModal}>Load demo modal</button> */}
      {showModal && (<Modal
        showModal={showModal}
        title='Complaint registered successfully !'
        handleCloseModal={handleCloseModal}
        message={`Complaint No is `}
        Misc={complaintNo}
      />)}
      <form className=''>
        <div className="">
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
            <label className="form-label ms-2 mt-2">House No.</label>
            <div className="row gx-1">
              <div className="col-sm-4">
                <select className="form-select mb-3" aria-label=".form-select" id='phase' value={phase} onChange={(e) => { setPhase(e.target.value) }}>
                  <option value="" disabled>Phase</option>
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="3">IV</option>
                  <option value="3">V</option>
                </select>
              </div>
              <div className="col-sm-4 mb-3">
                <input type="text" className="form-control" placeholder="Quater No." id='quaterNo' value={quaterNo} onChange={(e) => { setQuaterNo(e.target.value) }} />
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" placeholder="Sub" value={subQuaterNo} onChange={(e) => { setSubQuaterNo(e.target.value) }} />
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Name</label>
            <input type="text" className="form-control" placeholder="Complainee's Name" id='compName' value={compName} onChange={(e) => { setCompName(e.target.value) }} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Severity</label>
            <select className="form-select mb-3" aria-label=".form-select" id='severity' value={severity} onChange={(e) => { setSeverity(e.target.value) }}>
              <option value="" disabled>Choose option</option>
              <option value="1">Critical</option>
              <option value="2">Marginal</option>
              <option value="3">Negligible</option>
            </select>
          </div>
          <div className="form-group col-sm-6">
            <label className="form-label ms-2 mt-2">Phone No.</label>
            <input type="tel" className="form-control" placeholder="Phone Number" id='phNo' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label ms-2 mt-2">Description</label>
          <textarea type="text" className="form-control" placeholder="Description" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
        </div>
        <div className="mt-3 d-flex justify-content-center w-100">
        <button type="submit" className="btn btn-primary px-5" onClick={Register}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default CompHouse
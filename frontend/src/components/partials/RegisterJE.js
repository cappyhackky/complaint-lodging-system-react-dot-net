import React, { useState } from 'react'
import { validatePhone, validateRequired } from '../../utils/formValidation';
import { toast, ToastContainer } from 'react-toastify';

const RegisterJE = () => {
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const data = { region, name, email, phoneNo, password }
  const validateForm = () => {
    const requiredFields = ['region', 'name', 'email', 'phoneNo', 'password', 'confirmPassword'];
    const phoneInput = document.getElementById('phoneNo');
    validateRequired(requiredFields);
    validatePhone(phoneInput, phoneInput.value);
    return document.querySelector('.is-invalid') === null;
  }
  const registerJE = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!(password === confirmPassword)) {
        toast.error('Passwords do not match', {
          position: 'top-right',
        });
      } else {
        toast.success('Registeration Successful !', {
          position: 'top-right',
        });
        setRegion('');
        setName('');
        setEmail('');
        setPhoneNo('');
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      toast.error('Form Fields are invalid!', {
        position: 'top-right',
      });
    }
    console.log(data);
  }
  
  return (
    <>
      <ToastContainer />

      <div className="row ">
        <form className="">
          <div className="px-5"><h3 className="text-center bg-primary bg-opacity-25 p-3 text-teal rounded m b-3 mx-5">Register JE</h3></div>
          <div className="row d-flex justify-content-center">
            <div className="row col-12 col-lg-10">
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">Region</label>
                <div>
                  <select className="form-select" aria-label=".form-select" id='region' value={region} onChange={(e) => { setRegion(e.target.value) }}>
                    <option value="" disabled>Region</option>
                    <option value="JEH">House</option>
                    <option value="JEM">Hostel(Manager)</option>
                    <option value="JES">Hostel(Student)</option>
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">Name</label>
                <input type="text" className="form-control" placeholder="Name" id='name' value={name} onChange={(e) => { setName(e.target.value) }} />
              </div>
            </div>
            <div className="row col-12 col-lg-10">
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">E-mail</label>
                <input type="email" className="form-control" placeholder="E-mail" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">Phone No.</label>
                <input type="text" className="form-control" placeholder="Phone No." id='phoneNo' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
              </div>
            </div>
            <div className="row col-12 col-lg-10">
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">Password</label>
                <input type="password" className="form-control" placeholder="Password" id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label ms-2 mt-2">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password" id='confirmPassword' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-center w-100">
            <button type="submit" className="btn btn-primary px-5" onClick={registerJE}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterJE
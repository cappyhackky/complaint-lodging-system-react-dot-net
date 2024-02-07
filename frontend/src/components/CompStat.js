import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const CompStat = () => {
  const [compNo, setCompNo] = useState('');
  let model;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Status';
  })
  const getLink = (subCmp) => {
    switch (subCmp) {
      case 'CHO': model = "HouseComp";
        break;
      case 'CHM': model = "HostelMan";
        break;
      case 'CHS': model = "HostelStud";
        break;
      default: model = "HouseComp";
        break;
    }
    return `https://localhost:7004/api/${model}/get-complaint/${compNo}`;
  }
  const getStatus = async (e) => {
    if (!compNo) {
      toast.error('Please enter a Complaint No.', {
        position: 'top-right'
      });
      return
    }

    const apiLink = getLink(compNo.substring(0, 3));
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
        const data = [
          {
            id: result.respData.id,
            compName: result.respData.compName,
            createdOn: result.respData.createdOn,
            status: result.respData.status,
            phNo : result.respData.phoneNo,
            desc : result.respData.desc
          }]
        console.log(result);
        navigate('/viewComplaint', { state: { data: data } });
      }
    }).catch(error => {
      console.error(error);
    });
  }
  return (
    <>
      <ToastContainer />
      <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        <form method="post" className='mx-auto col-lg-4 col-md-8 col-10'>
          <div className="form-group">
            <label className="form-label ms-2 mt-2">Complaint No.</label>
            <input id='compNo' type="text" className="form-control" placeholder="CMPINT/EXT..." onChange={(e) => { setCompNo(e.target.value) }} />
            <div className="w-100 text-center mt-3">
              <button type="button" id="formSubmit" className="mt-3 btn btn-primary" onClick={getStatus}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CompStat
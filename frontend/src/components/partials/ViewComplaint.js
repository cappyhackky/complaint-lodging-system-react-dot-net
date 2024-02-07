import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FaSpinner, FaCheck, FaTimesCircle } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';

const ViewComplaint = () => {
  let model;
  const { state } = useLocation();
  const data = state?.data[0];
  const [status, setStatus] = useState(data.status);
  const getDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  }
  const getLink = (subCmp, compNo) => {
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
    return `https://localhost:7004/api/${model}/update-complaint/${compNo}/${'c'}`;
  }
  const handleClose = async (compNo) => {
    const apiLink = getLink(compNo.substring(0, 3), compNo);
    await fetch(apiLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OkNetwork ");
      }
      return (response.json());
    }).then(result => {
      if (result.statusCode === 200) {
        toast.success(result.statusMessage, {
          position: 'top-right'
        });
        setStatus('c')
      } else {
        toast.error(result.statusMessage, {
          position: 'top-right'
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }
  const getStatus = (status) => {
    switch (status) {
      case ('p'): return <><FaSpinner /> Processing</>;
      case ('a'): return <><FaCheck /> Approved</>;
      case ('c'): return <><FaTimesCircle /> Closed</>;
      default: return <><FaSpinner /> Processing</>;
    }
  }
  useEffect(() => {
    document.title = "View Complaints"
  })
  return (
    <>
      <ToastContainer />
      <div className='d-flex justify-content-center align-items-center vh-100 py-5 px-2 gx-0'>
        <div className="card">
          <div className="row ">
            <div className="col-lg-4 col-12">
              <img className="img-fluid p-5" src="/img/complaint.png" alt="" />
            </div>
            <div className="col-lg-8 col-12 table-responsive d-flex align-items-center">
              <div className="card-body">
                <h5 className="card-title ps-2">Complaint No. {data.id}</h5>
                <hr className="" />
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Complainee</td>
                      <td>:</td>
                      <td>{data.compName}</td>
                    </tr>
                    <tr>
                      <td>Phone No</td>
                      <td>:</td>
                      <td>{data.phNo}</td>
                    </tr>
                    <tr>
                      <td>Filed on</td>
                      <td>:</td>
                      <td>{getDate(data.createdOn)}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>:</td>
                      <td>{getStatus(status)}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>:</td>
                      <td>{data.desc}</td>
                    </tr>
                  </tbody>
                </table>
                {status === 'a' ? <div className="text-center"><div className="btn btn-dark" onClick={() => { handleClose(data.id) }}>Close Complaint</div></div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewComplaint
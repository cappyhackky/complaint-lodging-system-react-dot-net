import { click } from '@testing-library/user-event/dist/click';
import { React, useEffect, useState } from 'react'
import { FaSpinner, FaCheck, FaTimesCircle } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';

const Complaint = (props) => {
  const data = Array.isArray(props.data) ? props.data : [props.data];
  const [updatedStatus, setUpdatedStatus] = useState({});
  let model;
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
    return `https://localhost:7004/api/${model}/update-complaint/${compNo}/${'a'}`;
  }
  const handleApprove = async (compNo) => {
    console.log("click");
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
        setUpdatedStatus(prevStatus => ({
          ...prevStatus,
          [compNo]: getStatus('a', compNo)
        }));
      } else {
        toast.error(result.statusMessage, {
          position: 'top-right'
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }
  const getStatus = (status, compNo) => {
    console.log(status, compNo);
    const updatedStatusForComplaint = updatedStatus[compNo];

    if (updatedStatusForComplaint) {
      return updatedStatusForComplaint;
    }
    switch (status) {
      case ('p'): return <><FaSpinner /> Processing</>;
      case ('a'): return <><FaCheck /> Approved</>;
      case ('c'): return <><FaTimesCircle /> Closed</>;
      default: return <><FaSpinner /> Processing</>;
    }
  }

  const getDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    document.title = 'Status';
  }, [])

  return (
    <>
      <ToastContainer/>
      <div className="d-flex justify-content-between">
        <div><input
          type="search"
          className='form-control'
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        /></div>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map(
            (item, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <table className="table table-responsive-sm table-striped table-borderless table-primary">
        <thead>
          <tr>
            <th scope="col">Sno.</th>
            <th scope="col">Complaint ID</th>
            <th scope="col">Complainee Name</th>
            <th scope="col">Lodged Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((complaint, i) => (
              <tr key={complaint.id}>
                <th scope="row">{i + 1}</th>
                <td>{complaint.id}</td>
                <td>{complaint.compName}</td>
                <td>{getDate(complaint.createdOn)}</td>
                <td>{getStatus(complaint.status, complaint.id)}</td>
                <td className="text-center"><button className="btn btn-sm btn-success" onClick={()=>{handleApprove(complaint.id)}} disabled={(complaint.status !== 'p')}>Approve</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </>
  )
}

export default Complaint;
import React from 'react'

const ProfileComp = (props) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className='card'>
          <img className="card-img-top img-fluid w-25 p-3 mx-auto" src="/img/user.png" alt="" />
          <div className="card-body">
            <div className="card-title h4 text-center">
              {props.user.adminName||"Full name"}
            </div>
            <hr />
            <div className='px-3'>
            <table className="table text-center ">
              <tbody>
                <tr>
                  <td>Admin ID</td>
                  <td>:</td>
                  <td>{props.user.adminId||'Dummy ID'}</td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td>:</td>
                  <td>{props.user.adminDesignation ||"ADO"}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{props.user.adminEmail||"dummy@mail"}</td>
                </tr>
                <tr>
                  <td>Phone No.</td>
                  <td>:</td>
                  <td>{props.user.adminPhNo||"9523325555"}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileComp
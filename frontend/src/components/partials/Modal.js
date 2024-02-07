import React from 'react'

const Modal = (props) => {
  return (
    <>
      <div className={`modal bg-dark bg-opacity-50 fade ${props.showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.showModal ? 'block' : 'none' }} onClick={props.handleCloseModal} data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow">
            <div className="modal-header p-0 ps-3 bg-dark text-light border">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close" onClick={props.handleCloseModal}>
                <span aria-hidden="true" className='h3'>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{props.message}<span className='h4 text-danger'>{props.Misc}</span><br /></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;
import React from 'react'

const ReviewModal = ({isOpen, onClose}) => {
   if (!isOpen) return null;
  return (
     <div className="modal-container fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
     
     onClick={() => {
                  onClose();
                }}>
          <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] p-6 text-white relative">
            {/* Header */}
            <div className="modal-header flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="text-xl font-bold">User's Review</h3>
              <p
                className="close cursor-pointer text-2xl hover:text-indigo-400 transition"
                onClick={() => {
                  onClose();
                }}
              >
                &times;
              </p>
            </div>
    
    
            {/*Content*/}
            <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 text-white relative max-h-[85vh] overflow-y-auto">
              <div className="modal-content mt-4">
                Movie description, user review and comments
              </div>
            </div>
          </div>
        </div>
  )
}

export default ReviewModal
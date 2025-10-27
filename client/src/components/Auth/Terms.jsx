import React from "react";

const Terms = ({ title, children, onClose, onConfirm, confirmText = "OK" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        {/* title */}
        {title && (
          <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        )}

        {/* body content */}
        <div className="text-sm text-gray-300 max-h-60 overflow-y-auto mb-4">
          {children}
        </div>

        {/* footer buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-500"
          >
            Close
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;

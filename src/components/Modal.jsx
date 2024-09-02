import React from 'react';

const Modal = ({title, inputRef, onSubmit, onClose, error, success, placeholder}) => {

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
				<div className="bg-white p-6 rounded-md shadow-md w-96">
					<h2 className="text-2xl font-semibold mb-4">{title}</h2>
					<input
						ref={inputRef}
						type="text"
						placeholder={placeholder}
						className="input input-bordered input-sm w-full max-w-xs shadow-md mb-4"
					/>
					{error && <div className="alert alert-warning p-1.5 shadow-md mb-4">{error}</div>}
					{success && <div className="alert alert-success p-1.5 shadow-md mb-4">{success}</div>}
					<div className="flex justify-end gap-2">
						<button onClick={onClose} className="btn btn-outline shadow-md">Cancel</button>
						<button onClick={onSubmit} className="btn btn-primary shadow-md">Change</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
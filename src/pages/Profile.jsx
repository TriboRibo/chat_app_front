import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore.jsx";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import socket, {useSocket} from "../plugins/useSocket.jsx";

const Profile = () => {

	const [modalOpen, setModalOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const modalInputRef = useRef()

	const {currentUser, setCurrentUser, setConnected, connected} = mainStore()

	if (!currentUser) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			</div>
		);
	}

	const openModal = (title) => {
		setModalTitle(title)
		setModalOpen(true)
		setError(null)
		setSuccess(null)
	}
	const closeModal = () => {
		setModalOpen(false)
	}

	const handleSubmit = () => {
		setError(null);
		setSuccess(null);

		const inputValue = modalInputRef.current?.value.trim(); // Trim input value
		if (!inputValue) {
			setError('Input cannot be empty.');
			return;
		}

		if (modalTitle === 'Change username') {
			changeUsername(inputValue);
		} else if (modalTitle === 'Change password') {
			changePassword(inputValue);
		} else if (modalTitle === 'Change avatar') {
			changeAvatar(inputValue);
		}
	};
	const changeUsername = async () => {
		const newUsername = modalInputRef.current?.value
		// const updateData = {userId: currentUser.id, name: newUsername}
		if (!newUsername || newUsername.length < 4 || newUsername.length > 20) {
			setError('Username must be between 4 and 20 characters.');
			return;
		}
		if (newUsername === currentUser.username) {
			setError('New username must be different from the current one.');
			return;
		}
		try {
			const token = localStorage.getItem('token')
			if (!token){
				console.error('token not found')
				return
			}
			const response = await axios.post('http://localhost:2000/changeUsername',
				{ userId: currentUser.id, name: newUsername },
				{ headers: { Authorization: `Bearer ${token}`}}
			)
			handleResponse(response)
		} catch (error) {
			setError('An error occurred while updating your username. Please try again.')
		}
	}
	const handleResponse = (response) => {
		if (response.data.success) {
			const updatedUser = response.data.data
			setSuccess(response.data.message)
			setCurrentUser({
				id: updatedUser.id,
				username: updatedUser.name,
				avatar: updatedUser.avatar
			})
			setConnected(prev => prev.map(user => user.id === updatedUser.id ? { ...user, avatar: updatedUser.name } : user))
			socket.emit('setUsername', updatedUser)
			socket.emit('userProfileUpdated', updatedUser); // Emit the updated user profile
			socket.emit('userListUpdate')
			closeModal()
	} else {
			setError(response.data.error || 'an unexpected error occurred.')
		}
}
	const changePassword = async () => {
		const newPassword = modalInputRef.current?.value
		if (!newPassword) {
			setError('New password is required.')
			return
		}
		const updateData = { userId: currentUser.id, newPassword: newPassword }
		try {
			const token = localStorage.getItem('token')
			if (!token){
				console.error('token not found')
				return
			}
			const response = await axios.post('http://localhost:2000/changePassword', updateData, {
				headers: {Authorization: `Bearer ${token}`}
			})
			handlePasswordResponse(response)
		} catch (error) {
			setError('An error occurred while updating your password. Please try again.')
		}
	}
	const handlePasswordResponse = (response) => {
		if (response.data.success) {
			setSuccess(response.data.message || 'Password updated successfully.');
			closeModal();
		} else {
			setError(response.data.error || 'An unexpected error occurred.');
		}
	}
	const changeAvatar = async () => {
		const newAvatar = modalInputRef.current?.value
		if (!newAvatar){
			setError('Avatar URL is required.')
			return
		}
		const updateData = { userId: currentUser.id, newAvatar }
		try {
			const token = localStorage.getItem('token')
			if (!token){
				console.error('token not found')
				return
			}
			const response = await axios.post('http://localhost:2000/changeAvatar', updateData, {
				headers: {Authorization: `Bearer ${token}`}
			})
			handleAvatarResponse(response)
		} catch (error) {
			setError('An error occurred while updating your avatar. Please try again.')
		}
	}
	const handleAvatarResponse = (response) => {
		if (response.data.success) {
			const updatedUser = response.data.data;
			setSuccess(response.data.message)
			setCurrentUser({
				id: updatedUser.id,
				username: updatedUser.name,
				avatar: updatedUser.avatar
			})
			setConnected(prev => prev.map(user => user.id === updatedUser.id ? { ...user, avatar: updatedUser.avatar } : user))
			socket.emit('setUsername', updatedUser)
			socket.emit('userProfileUpdated', updatedUser); // Emit the updated user profile
			socket.emit('userListUpdate')
			closeModal()
		} else {
			setError(response.data.error || 'An unexpected error occurred.');
		}
	}

	const getPlaceholder = () => {
		if (modalTitle === 'Change username') {
			return 'Enter new username';
		} else if (modalTitle === 'Change password') {
			return 'Enter new password';
		} else if (modalTitle === 'Change avatar') {
			return 'Enter new avatar URL';
		} else {
			return '';
		}
	};

	return (
		<>
			<div className='flex justify-center'>
				<div
					className="z-0 select-none group before:hover:scale-95 before:hover:h-96 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-96 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden shadow-md">
					<img
						className="w-28 h-28 object-cover bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
						src={currentUser.avatar} alt="avatar"/>
					<div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
					<span
						style={{cursor: 'pointer'}}
						className="text-2xl font-semibold">{currentUser.username}</span>
					</div>
					<button
						className="btn btn-outline z-10 w-1/2 shadow-md"
						onClick={() => openModal('Change username')}
					>
						Change username
					</button>
					<button
						className="btn btn-outline z-10 w-1/2 shadow-md"
						onClick={() => openModal('Change password')}
					>
						Change password
					</button>
					<button
						className="btn btn-outline z-10 w-1/2 shadow-md"
						onClick={() => openModal('Change avatar')}
					>
						Change avatar
					</button>
				</div>
			</div>
			{modalOpen && (
				<Modal
					title={modalTitle}
					inputRef={modalInputRef}
					onSubmit={handleSubmit}
					onClose={closeModal}
					error={error}
					success={success}
					placeholder={getPlaceholder()}
				/>
			)}
		</>
	);
};

export default Profile;
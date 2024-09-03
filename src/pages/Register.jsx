import React, {useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore.jsx";
import socket from '../plugins/useSocket.jsx'

const Register = () => {

	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	const userRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const nav = useNavigate()

	const register = async () => {
		setError(null)
		setSuccess(null)
		const username = userRef.current?.value
		const password = passwordRef.current?.value
		const repeatPassword = passwordConfirmRef.current?.value

		if (!username || !password || !repeatPassword) {
			setError('All fields are required')
			return
		}
		if (password !== repeatPassword) {
			setError('Passwords do not match')
			return
		}

		try {
			const response = await axios.post('http://localhost:2000/registerNewUser', {
				name: username,
				password: password,
				repeatPassword: repeatPassword
			})
			if (response.data.success) {
				setSuccess(response.data.message)
				socket.emit('userListUpdate')
				setTimeout(() => {
					nav ('/login')
				}, 500)
			} else {
				setError(response.data.message)
			}

		} catch (error) {
			if (error.response && error.response.data) {
				setError(error.response.data.error)
			} else {
				setError('an unexpected error')
			}

		}
	}
	//Clear error message when start typing again
	const handleInputChange = () => {
		setError(null)
		setSuccess(null)
	}

	return (
		<>
			<div className='flex items-center justify-center select-none'>
				<div className='w-full max-w-sm border rounded-md p-4 mt-10 shadow-md'>
					<div className='flex flex-col items-center gap-2'>
						<input
							ref={userRef}
							type="text"
							placeholder='username'
							className='input input-bordered input-sm w-full max-w-xs shadow-md'
							onChange={handleInputChange}
						/>
						<input
							ref={passwordRef}
							type="password"
							placeholder='password'
							className='input input-bordered input-sm w-full max-w-xs shadow-md'
							onChange={handleInputChange}
						/>
						<input
							ref={passwordConfirmRef}
							type="password"
							placeholder='repeat password'
							className='input input-bordered input-sm w-full max-w-xs shadow-md'
							onChange={handleInputChange}
						/>
						<div className='w-full max-w-xs'>
							{error && <div role="alert" className="alert alert-warning p-1.5 shadow-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 shrink-0 stroke-current"
									fill="none"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
								</svg>
								<span>{error}</span>
							</div>}
						</div>
						<div className='w-full max-w-xs'>
							{success && <div role="alert" className="alert alert-success p-1.5 shadow-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 shrink-0 stroke-current"
									fill="none"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>{success}</span>
							</div>}
						</div>
						<div>
							<div className='btn btn-outline w-full shadow-md' onClick={register}>Register</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
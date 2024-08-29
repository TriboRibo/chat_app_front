import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import socket from "../plugins/useSocket.jsx";
import mainStore from "../store/mainStore.jsx";

const LogIn = () => {

	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const {setConnected} = mainStore()
	const userRef = useRef()
	const passwordRef = useRef()
	const nav = useNavigate()

	const login = async () => {
		setError('')
		const username = userRef.current?.value
		const password = passwordRef.current?.value

		if (!username || !password) {
			setError('All fields are required')
			return
		}
		try {
			const response = await axios.post('http://localhost:2000/login', {
				name: username,
				password: password,
			})
			console.log('logged in:', response.data)
			if (!response.data.success) {
				console.log(response.data.message)
				setError(response.data.message)
			} else {
				socket.emit('setUsername', username)
				console.log('Logged in success for:', response.data.data.username)
				setSuccess('Login successful!')
				setConnected(response.data.data.username)
				setTimeout(() => {
					nav('/')
				}, 500)
			}
		} catch (error) {
			setError(error.response?.data?.error || 'login failed')
		}
	}

	const handleInputChange = () => {
		setError(null)
		setSuccess(null)
	}

	return (
		<>
			<div className='flex items-center justify-center select-none'>
				<div className='w-full max-w-sm border rounded-md p-4 mt-10'>
					<div className='flex flex-col gap-2 items-center'>
						<input
							ref={userRef}
							type="text"
							placeholder='username'
							className='input input-bordered input-sm w-full max-w-xs'
							onChange={handleInputChange}
						/>
						<input
							ref={passwordRef}
							type="text"
							placeholder='password'
							className='input input-bordered input-sm w-full max-w-xs'
							onChange={handleInputChange}
						/>
						<div className='w-full max-w-xs'>
							{error && <div role="alert" className="alert alert-warning p-1.5">
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
							{success && <div role="alert" className="alert alert-success p-1.5">
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
							<div className='btn btn-outline' onClick={login}>Log In</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LogIn;
import React, {useRef, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Themes from "./Themes.jsx";
import AllOnlineUsers from "./AllOnlineUsers.jsx";
import mainStore from "../store/mainStore.jsx";
import socket from "../plugins/useSocket.jsx";

const Toolbar = () => {

	const {currentUser, setCurrentUser, removeConnected} = mainStore()
	const nav = useNavigate()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	const menuButtonRef = useRef(null)

	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.key === 'sessionId') {
				const newSessionId = event.newValue
				const currentSessionId = localStorage.getItem('sessionId')

				if (currentSessionId && newSessionId && newSessionId !== currentSessionId) {
					// Session ID has changed, handle accordingly
					handleSessionChange()
				}
			}
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const handleSessionChange = () => {
		// Example: Log out user when session ID changes
		handleLogout()
	}

	const handleLogout = () => {
		if (currentUser) {
			socket.emit('logout', {username: currentUser.username})
			removeConnected(currentUser.username)
			setCurrentUser(null)
			localStorage.removeItem('token');
			localStorage.removeItem('currentUser');

			nav('/')
		}
	}
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		// Close dropdown on screen resize if the screen becomes larger
		const handleResize = () => {
			if (window.innerWidth >= 640) {
				setIsDropdownOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative'>
			{/* Dropdown Button for Small Screens */}
			<div
				className='flex flex-col sm:flex-row gap-1 border rounded-md m-2 p-2 justify-between shadow-md sticky top-2 z-10 bg-base-100'>
				{/* Desktop Links */}
				<div className='hidden sm:flex gap-1'>
					<Link className='btn btn-outline shadow-md' to='/'>Home</Link>
					<Link className='btn btn-outline shadow-md' to='/users'>All users</Link>
					{currentUser && (
						<Link className='btn btn-outline shadow-md' to='profile'>Profile</Link>
					)}
				</div>

				{/* Dropdown Button for Small Screens */}
				<button
					className='sm:hidden btn btn-outline shadow-md'
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					Menu
				</button>

				{/* Buttons for Larger Screens */}
				<div className='hidden sm:flex gap-1'>
					{currentUser ? (
						<>
							<Link className='btn btn-outline shadow-md' to='/chat'>Chat rooms</Link>
							<button><AllOnlineUsers/></button>
							<button className='btn btn-outline shadow-md' onClick={handleLogout}>Log out</button>
						</>
					) : (
						<>
							<Link className='btn btn-outline shadow-md' to='/register'>Register</Link>
							<Link className='btn btn-outline shadow-md' to='login'>LogIn</Link>
						</>
					)}
					<Themes/>
				</div>
			</div>

			{/* Dropdown Menu for Small Screens */}
			{isDropdownOpen && (
				<div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20'>
					<Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100' to='/'>Home</Link>
					<Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100' to='/users'>All users</Link>
					{currentUser && (
						<Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100' to='profile'>Profile</Link>
					)}
					{currentUser ? (
						<>
							<button
								className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'
								onClick={handleLogout}
							>
								Log out
							</button>
							<div className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'>
								<AllOnlineUsers/>
							</div>
						</>
					) : (
						<>
							<Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
							      to='/register'>Register</Link>
							<Link className='block px-4 py-2 text-gray-700 hover:bg-gray-100' to='login'>LogIn</Link>
						</>
					)}
					<div className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
						<Themes/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Toolbar;
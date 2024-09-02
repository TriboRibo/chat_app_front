import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Themes from "./Themes.jsx";
import AllOnlineUsers from "./AllOnlineUsers.jsx";
import mainStore from "../store/mainStore.jsx";
import socket from "../plugins/useSocket.jsx";

const Toolbar = () => {

	const {currentUser, setCurrentUser, removeConnected} = mainStore()
	const nav = useNavigate()
	const handleLogout = () => {
		if (currentUser) {
			socket.emit('logout', {username: currentUser.username})
			removeConnected(currentUser.username)
			setCurrentUser(null)
			nav('/')
		}
	}

	return (
		<>
			<div className='flex gap-1 border rounded-md m-2 p-2 justify-between shadow-md sticky top-2 z-10 bg-base-100'>
				<div className='flex gap-1'>
					<Link className='btn btn-outline shadow-md' to='/'>Home</Link>
					<Link className='btn btn-outline shadow-md' to='/users'>All users</Link>
					{currentUser && (
						<Link className='btn btn-outline shadow-md' to='profile'>Profile</Link>
					)}
				</div>
				<div className='flex gap-1'>
					{currentUser ? (
						<>
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
		</>
	);
};

export default Toolbar;
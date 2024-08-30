import React from 'react';
import {Link} from 'react-router-dom';
import Themes from "./Themes.jsx";
import AllOnlineUsers from "./AllOnlineUsers.jsx";

const Toolbar = () => {
	return (
		<>
			<div className='flex gap-1 border rounded-md m-2 p-2 justify-between shadow-md sticky top-2'>
				<div className='flex gap-1'>
					<Link className='btn btn-outline shadow-md' to='/'>Home</Link>
					<Link className='btn btn-outline shadow-md' to='/users'>All users</Link>
				</div>
				<div className='flex gap-1'>
					<button><AllOnlineUsers/></button>
					<Link className='btn btn-outline shadow-md' to='/register'>Register</Link>
					<Link className='btn btn-outline shadow-md' to='login'>LogIn</Link>
					<Themes/>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
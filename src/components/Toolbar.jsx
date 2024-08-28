import React from 'react';
import {Link} from 'react-router-dom';
import Themes from "./Themes.jsx";

const Toolbar = () => {
	return (
		<>
			<div className='flex gap-1 border rounded-md m-2 p-2 justify-between'>
				<Link className='btn btn-outline' to='/'>Home</Link>
				<div className='flex gap-1'>
					<Link className='btn btn-outline' to='/register'>Register</Link>
					<Link className='btn btn-outline' to='login'>LogIn</Link>
					<Themes/>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
import React, {useEffect, useState} from 'react';
import axios from "axios";

const Home = () => {
	const [users, setUsers] = useState([])
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost:2000/getAllMembers')
				setUsers(response.data.users)
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUsers()
	}, [])

	return (
		<>
			<div className='user-list'>
				<h2>Registered Users</h2>
				<ul>
					{users.map(user => (
						<li key={user._id}>{user.name}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Home;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSocket} from '../plugins/useSocket.jsx'

const Home = () => {
	const [users, setUsers] = useState([])
	const [connectedUsers, setConnectedUsers] = useState([])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost:2000/getAllMembers')
				setUsers(response.data.users)
				console.log('fetched users:', response.data.users)
			} catch (error) {
				console.log('error fetching users', error)
			}
		}
		fetchUsers()
	}, [])

	//Listen for list updates
	useSocket('userListUpdate', (userList) => {
		setConnectedUsers(userList)
	})

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
			<div className='user-list'>
				<h2>Connected Users</h2>
				<ul>
					{connectedUsers.map((user, index) => (
						<li key={index}>{user}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Home;
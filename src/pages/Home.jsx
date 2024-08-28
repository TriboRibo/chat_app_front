import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSocket} from '../plugins/useSocket.jsx'
import mainStore from "../store/mainStore.jsx";

const Home = () => {

	const {users, setUsers, connected, setConnected} = mainStore()

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
	}, [setUsers])

	//Listen for list updates
	useSocket('connectedUsersUpdate', (connectedUsers) => {
		setConnected(connectedUsers)
	})

	return (
		<>
			<div className='flex justify-evenly'>
				<div className='user-list'>
					<h2>Registered Users</h2>
					<ul>
						{users && users.map(user => (
							<li key={user._id}>{user.name}</li>
						))}
					</ul>
				</div>
				<div className='user-list'>
					<h2>Connected Users</h2>
					<ul>
						{connected && connected.map((user, index) => (
							<li key={index}>{user}</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
import React, {useEffect} from 'react';
import mainStore from "../store/mainStore.jsx";
import axios from "axios";
import {useSocket} from "../plugins/useSocket.jsx";
import {useNavigate} from "react-router-dom";

const AllUsers = () => {

	const {users, setUsers} = mainStore()
	const nav = useNavigate()

	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:2000/getAllMembers')
			setUsers(response.data.users)
			console.log('fetched users:', response.data.users)
		} catch (error) {
			console.log('error fetching users', error)
		}
	}
	useEffect(() => {
		fetchUsers()
	}, [setUsers])

	useSocket('userListUpdate', () => {
		fetchUsers()
	})

	const handleUserClick = (username) => {
		nav(`/user/${username}`)
	}

	return (
		<>
			<div className='user-list'>
				<h2>Registered Users</h2>
				<ul>
					{users && users.map(user => (
						<li key={user._id} onClick={() => handleUserClick(user.name)}>
							{user.name}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default AllUsers;
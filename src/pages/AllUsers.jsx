import React, {useEffect, useState} from 'react';
import mainStore from "../store/mainStore.jsx";
import axios from "axios";
import {useSocket} from "../plugins/useSocket.jsx";
import {useNavigate} from "react-router-dom";
import SingleUserComp from "../components/SingleUserComp.jsx";

const AllUsers = () => {

	const {users, setUsers, currentUser} = mainStore()
	const [error, setError] = useState(null);
	const nav = useNavigate()

	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:2000/getAllMembers')
			setUsers(response.data.users)
		} catch (error) {
			setError(error)
		}
	}
	useEffect(() => {
		fetchUsers()
	}, [setUsers])

	useSocket('userListUpdate', () => {
		fetchUsers()
	})

	const handleUserClick = (username) => {
		if (currentUser && username === currentUser.username) {
			nav('/profile')
		} else {
			nav(`/user/${username}`)
		}
	}

	return (
		<>
			<div className='user-list'>
				<div className='flex flex-wrap gap-8 justify-center mt-4'>
					{Array.isArray(users) && users.length > 0 ? (
						users.map(user => (
						<SingleUserComp key={user._id} user={user} onClick={handleUserClick} />
						))
					) : (
						<p>No users found</p>
					)}
				</div>
			</div>
		</>
	);
};

export default AllUsers;
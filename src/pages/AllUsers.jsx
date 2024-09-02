import React, {useEffect} from 'react';
import mainStore from "../store/mainStore.jsx";
import axios from "axios";
import {useSocket} from "../plugins/useSocket.jsx";
import {useNavigate} from "react-router-dom";
import SingleUserComp from "../components/SingleUserComp.jsx";

const AllUsers = () => {

	const {users, setUsers, currentUser} = mainStore()
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
		if (currentUser && username === currentUser.username) {
			nav('/profile')
		} else {
			nav(`/user/${username}`)
		}
	}

	return (
		<>
			<div className='user-list'>
				<h2>Registered Users</h2>
				<div className='flex flex-wrap gap-8 justify-center'>
					{users && users.map(user => (
						<SingleUserComp key={user._id} user={user} onClick={handleUserClick} />
					))}
				</div>
			</div>
		</>
	);
};

export default AllUsers;
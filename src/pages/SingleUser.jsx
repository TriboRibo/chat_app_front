import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const SingleUser = () => {

	const {name} = useParams()
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`http://localhost:2000/getUser/${name}`)
				setUser(response.data.user)
				console.log(response.data)
			} catch (error) {
				setError('Error fetching user details')
				console.error(error)
			}
		}
		fetchUser()
	}, [])

	if (error) return <div>Error: {error}</div>
	if (!user) return <div>Loading...</div>

	return (
		<>
			<div className='user-detail'>
				<h1>User Details</h1>
				<p><strong>Username:</strong> {user.name}</p>
			</div>
		</>
	);
};

export default SingleUser;
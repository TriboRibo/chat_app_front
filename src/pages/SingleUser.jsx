import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import ChatWindow from "../components/ChatWindow.jsx";

const SingleUser = () => {

	const {name} = useParams()
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)
	const [showChat, setShowChat] = useState(false)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`http://localhost:2000/getUser/${name}`)
				setUser(response.data.user)
			} catch (error) {
				setError('Error fetching user details')
				console.error(error)
			}
		}
		fetchUser()
	}, [])

	const handleSendMessage = () => {
		setShowChat(true)
	}

	if (error) return <div>Error: {error}</div>
	if (!user) return <div>Loading...</div>

	return (
		<>
			<div className='flex justify-center'>
				<div
					className="z-0 select-none group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden shadow-md">
					<img
						className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
						src={user.avatar} alt="avatar"/>
					<div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
					<span
						style={{cursor: 'pointer'}}
						className="text-2xl font-semibold">{user.name}</span>
					</div>
					<button className="btn btn-outline z-10 w-1/2 shadow-md"
					   onClick={handleSendMessage}
					>Send message</button>
				</div>
			</div>
		</>
	);
};

export default SingleUser;
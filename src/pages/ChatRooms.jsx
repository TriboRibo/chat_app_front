import React, {useEffect, useState} from 'react';
import axios from "axios";
import socket from "../plugins/useSocket.jsx";
import ChatRoomModal from "../components/ChatRoomModal.jsx";

const ChatRooms = () => {

	const [message, setMessage] = useState('');
	const [roomName, setRoomName] = useState('');
	const [rooms, setRooms] = useState([]);
	const [currentRoom, setCurrentRoom] = useState(null);
	const [roomDetails, setRoomDetails] = useState(null);
	const [showDetailsModal, setShowDetailsModal] = useState(false);

	useEffect(() => {
		// Fetch existing rooms when the component mounts
		const fetchRooms = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					console.error('Token not found');
					return;
				}
				const response = await axios.get('http://localhost:2000/getRoom', {
					headers: {Authorization: `Bearer ${token}`}
				});
				setRooms(response.data);
			} catch (error) {
				console.error('Error fetching rooms:', error);
			}
		}
	}, [])

	const handleCreateRoom = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('Token not found');
				return;
			}
			const response = await axios.post(
				'http://localhost:2000/createRoom',
				{name: roomName},
				{headers: {Authorization: `Bearer ${token}`}}
			);
			setRooms([...rooms, response.data]);
			setCurrentRoom(roomName);
			setRoomName('');
		} catch (error) {
			console.error('Error creating room:', error);
		}
	};

	const handleJoinRoom = (room) => {
		setCurrentRoom(room);
		socket.emit('createRoom', room); // Join the room
	};

	const handleSendMessage = () => {
		if (message.trim()) {
			const messageData = {
				sender: 'currentUser', // Replace with actual user
				content: message,
				timestamp: new Date(),
			};
			if (currentRoom) {
				socket.emit('sendMessageToRoom', {roomName: currentRoom, message: messageData});
			} else {
				socket.emit('sendMessage', messageData);
			}
			setMessage('');
		}
	};

	const fetchRoomDetails = async (roomName) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('Token not found');
				return;
			}
			const response = await axios.get(`http://localhost:2000/getRoomDetails/${roomName}`, {
				headers: {Authorization: `Bearer ${token}`}
			});
			setRoomDetails(response.data);
			setShowDetailsModal(true);
		} catch (error) {
			console.error('Error fetching room details:', error);
		}
	};

	const handleCloseModal = () => {
		setShowDetailsModal(false);
		setRoomDetails(null);
	};

	return (
		<>
			<div className='flex gap-2 m-2'>
				<input
					type="text"
					className='input input-bordered p-2'
					placeholder="Room name"
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
				/>
				<button className='btn btn-outline shadow-md' onClick={handleCreateRoom}>Create Room</button>
			</div>
			<div className='m-2 border bordered'>
				<h3>Rooms:</h3>
				<ul>
					{rooms.map((room) => (
						<li key={room._id}>
							<button onClick={() => handleJoinRoom(room.name)}>
								{room.name}
							</button>
							<button onClick={() => fetchRoomDetails(room.name)}>
								View Details
							</button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<input
					type="text"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={handleSendMessage}>Send</button>
			</div>
			{showDetailsModal && roomDetails && (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={handleCloseModal}>&times;</span>
						<h2>{roomDetails.roomName}</h2>
						<h3>Participants:</h3>
						<ul>
							{roomDetails.participants.map((participant) => (
								<li key={participant._id}>{participant.name}</li>
							))}
						</ul>
						<h3>Messages:</h3>
						<ul>
							{roomDetails.messages.map((msg, index) => (
								<li key={index}>
									<strong>{msg.sender}</strong>: {msg.content}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatRooms;
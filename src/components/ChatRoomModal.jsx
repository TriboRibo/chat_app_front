// components/ChatRoomModal.jsx
import React, { useEffect, useState } from 'react';
import socket from '../plugins/useSocket.jsx';
import axios from 'axios';

const ChatRoomModal = ({ room, onClose }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		if (room) {
			// Fetch initial messages and participants
			const fetchRoomDetails = async () => {
				try {
					const response = await axios.get(`http://localhost:2000/getRoomDetails/${room}`);
					setMessages(response.data.messages);
					setParticipants(response.data.participants);
				} catch (error) {
					console.error('Error fetching room details:', error);
				}
			};

			fetchRoomDetails();

			// Listen for new messages and participants updates
			socket.on('receiveMessageToRoom', (messageData) => {
				if (messageData.roomName === room) {
					setMessages((prevMessages) => [...prevMessages, messageData.message]);
				}
			});

			socket.on('updateRoomParticipants', (updatedParticipants) => {
				if (room) {
					setParticipants(updatedParticipants);
				}
			});

			// Clean up listeners on unmount
			return () => {
				socket.off('receiveMessageToRoom');
				socket.off('updateRoomParticipants');
			};
		}
	}, [room]);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			const messageData = {
				sender: 'currentUser', // Replace with actual user
				content: newMessage,
				timestamp: new Date(),
			};
			socket.emit('sendMessageToRoom', { roomName: room, message: messageData });
			setNewMessage('');
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="modal-box p-4 bg-white rounded shadow-lg">
				<button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
					&times;
				</button>
				<h2 className="text-lg font-bold">Room: {room}</h2>
				<div className="my-4 border-b">
					<h3 className="text-md font-semibold">Participants:</h3>
					<ul>
						{participants.map((participant) => (
							<li key={participant.id}>{participant.username}</li>
						))}
					</ul>
				</div>
				<div className="my-4 border-b">
					<h3 className="text-md font-semibold">Messages:</h3>
					<div className="h-60 overflow-y-auto">
						{messages.map((msg, index) => (
							<div key={index} className={`chat-message ${msg.sender === 'currentUser' ? 'chat-end' : 'chat-start'}`}>
								<strong>{msg.sender}: </strong>{msg.content}
								<div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex gap-2">
					<input
						type="text"
						placeholder="Type a message..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						className="input input-bordered flex-1"
					/>
					<button onClick={handleSendMessage} className="btn btn-outline">Send</button>
				</div>
			</div>
		</div>
	);
};

export default ChatRoomModal;
import React, {useEffect, useRef, useState} from 'react';
import {useSocket} from "../plugins/useSocket.jsx";
import socket from "../plugins/useSocket.jsx";
import mainStore from "../store/mainStore.jsx";

const ChatWindow = () => {

	const {currentUser, users, messages, addMessages} = mainStore()
	const [message, setMessage] = useState('')
	const chatEndRef = useRef(null)
	const [isModalVisible, setModalVisible] = useState(false)

	useSocket('receiveMessage', (message) => {
		addMessages(message)
	})

	const handleSendMessage = () => {
		if (!currentUser) {
			setModalVisible(true)
			return
		}
		if (message.trim()) {
			const messageData = {
				sender: currentUser.username,
				content: message,
				timestamp: new Date(),
			}
			socket.emit('sendMessage', messageData)
			setMessage('')
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const getUserAvatar = (username) => {
		if (currentUser && username === currentUser.username) {
			return currentUser.avatar
		}
		if (Array.isArray(users)) {
			const user = users.find((user) => user.name === username)
			return user ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
		console.log('Expected users to be an array, but got:', users)
		return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
	}

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
	}, [messages, currentUser])


	return (
		<>
			<div className="flex flex-col h-[calc(100vh-100px)]">
				<div
					className='border-t border-s border-e mt-2 ms-2 me-2 p-4 rounded-t-md flex-1 overflow-y-auto'>
					{messages.map((msg, index) => {
						const isOwnMessage = currentUser && msg.sender === currentUser.username; // Replace with actual user name check
						return (
							<div
								key={index}
								className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}
							>
								<div className="chat-image avatar">
									<div className="w-10 rounded-full">
										<img
											alt={`${msg.sender}'s avatar`}
											src={getUserAvatar(msg.sender)} // Use default if user is not found
										/>
									</div>
								</div>
								<div className="chat-header flex items-center gap-1">
									{msg.sender}
									<time
										className="text-xs opacity-50">{new Date(msg.timestamp).toLocaleTimeString()}</time>
								</div>
								<div
									className={`chat-bubble break-words ${isOwnMessage ? 'chat-bubble-info' : 'chat-bubble-secondary'}`}>
									{msg.content}
								</div>
								<div className="chat-footer opacity-50">
									{msg.isRead ? 'Read' : 'Delivered'}
								</div>
							</div>
						);
					})}
					<div ref={chatEndRef}/>
				</div>
				<div className='flex border-s border-e border-b rounded-b-md ms-2 me-2 select-none shadow-md'>
					<input
						className='input input-bordered p-2 d w-full mt-2 mb-3 ms-3 rounded-none rounded-l-md focus:outline-none shadow-md focus:shadow-md'
						type="text"
						placeholder='Type a message...'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button
						className='btn btn-outline me-3 mt-2 rounded-none rounded-r-md shadow-md'
						onClick={handleSendMessage}
					>
						Send
					</button>
				</div>
			</div>
			{isModalVisible && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 select-none"
					onClick={() => setModalVisible(false)}
				>
					<div
						className="modal-box"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-2 right-2 text-gray-600"
							onClick={() => setModalVisible(false)}
						>
							&times;
						</button>
						<h3 className="text-lg font-bold">Login Required</h3>
						<p className="py-4">Please log in to send messages.</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatWindow;
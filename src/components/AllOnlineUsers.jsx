import React, {useEffect} from 'react';
import mainStore from "../store/mainStore.jsx";
import socket, {useSocket} from "../plugins/useSocket.jsx";

const AllOnlineUsers = () => {

	const {connected, setConnected, currentUser, setCurrentUser} = mainStore()

	useSocket('connectedUsersUpdate', (users) => {
		setConnected(users)
	})

	useEffect(() => {
		const handleConnectedUsersUpdate = (users) => {
			if (Array.isArray(users)) {
				setConnected(users);
			} else {
				setConnected([])
			}

		};

		socket.on('connectedUsersUpdate', handleConnectedUsersUpdate);

		return () => {
			socket.off('connectedUsersUpdate', handleConnectedUsersUpdate);
		};
	}, [setConnected]);

	if (!connected) {
		return <div>Loading...</div>
	}

	return (
		<>
			{/* The button to open modal */}
			<label htmlFor="my_modal_7"
			       className='btn btn-outline shadow-md z-20'>Online: {Array.isArray(connected) ? connected.length : 0}</label>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my_modal_7" className="modal-toggle"/>
			<div className="modal z-50 fixed inset-0 justify-items-center pe-10" role="dialog">
				<div className="modal-box z-50 cursor-auto">
					<h3 className="text-lg font-bold">Online:</h3>
					<ul className="py-4 flex flex-col gap-2">
						{Array.isArray(connected) && connected.length > 0 ? (
							connected.map((user, index) =>  user && user.avatar ? (
								<li
									key={index}
									className='flex justify-between h-20 border-2 rounded-md ms-5 pt-3 pb-3 cursor-pointer hover:scale-102'
								>
									<div className='flex items-center justify-center gap-2 ps-2'>
										<img
											className="ring-primary w-12 h-12 rounded-full object-cover"
											src={user.avatar} alt=""
										/>
										{user.username || 'unknown'}
									</div>
									<div className='flex gap-1 pe-2 items-center'>
										{user.username !== currentUser?.username && (
											<>
												<div className='btn btn-outline'>Add to chat</div>
												<div className='btn btn-outline'>Write a message</div>
											</>
										)}
									</div>
								</li>
							) : null )
						) : (
							<li>No users online</li>
						)}
					</ul>
				</div>
				<label className="modal-backdrop scroll-m-1.5 z-40" htmlFor="my_modal_7">Close</label>
			</div>
		</>
	);
};

export default AllOnlineUsers;
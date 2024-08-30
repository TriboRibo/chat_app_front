import React from 'react';
import mainStore from "../store/mainStore.jsx";
import {useSocket} from "../plugins/useSocket.jsx";

const AllOnlineUsers = () => {

	const {connected, setConnected} = mainStore()

	useSocket('connectedUsersUpdate', (users) => {
		setConnected(users)
	})

	return (
		<>
			{/* The button to open modal */}
			<label htmlFor="my_modal_7"
			       className='btn btn-outline shadow-md'>Online: {Array.isArray(connected) ? connected.length : 0}</label>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my_modal_7" className="modal-toggle"/>
			<div className="modal justify-items-end pe-10" role="dialog">
				<div className="modal-box cursor-auto">
					<h3 className="text-lg font-bold">Online:</h3>
					<ul className="py-4 flex flex-col gap-2">
						{Array.isArray(connected) && connected.length > 0 ? (
							connected.map((user) => (
								<li
									key={user.id}
									className='flex justify-between border-2 rounded-md ms-5 pt-3 pb-3 cursor-pointer hover:scale-102'
								>
									<div className='flex items-center justify-center gap-2 ps-2'>
										<img
											className="ring-primary w-10 rounded-full "
											src={user.avatar} alt=""
										/>
										{user.username}
									</div>
									<div className='flex gap-1 pe-2'>
										<div className='btn btn-outline'>Add to chat</div>
										<div className='btn btn-outline'>Write a message</div>
									</div>
								</li>
							))
						) : (
							<li>No users online</li>
						)}
					</ul>
				</div>
				<label className="modal-backdrop scroll-m-1.5" htmlFor="my_modal_7">Close</label>
			</div>
		</>
	);
};

export default AllOnlineUsers;
// import React, {useEffect} from 'react';
// import mainStore from "../store/mainStore.jsx";
// import socket from "../plugins/useSocket.jsx";
//
// const UseUserSync = () => {
// 	const {addUser, setUsers, setConnected, addConnected, removeConnected} = mainStore(state => ({
// 		setUsers: state.setUsers,
// 		setConnected: state.setConnected,
// 		addConnected: state.addConnected,
// 		removeConnected: state.removeConnected,
// 		addUser: state.addUser,
// 	}))
//
// 	useEffect(() => {
// 		const handlerNewUser = (username) => {
// 			addConnected(username)
// 			// addUser(username)
// 			console.log('new user:', username)
// 		}
// 		const handleUserDisconnect = (username) => {
// 			removeConnected(username)
// 			console.log('user disconnected:', username)
// 		}
// 		const handleUserListUpdate =(userList) => {
// 			console.log('Recevied user list update:', userList)
// 			setUsers(userList)
// 			setConnected(userList)
// 		}
// 		socket.on('newUserRegistered', handlerNewUser)
// 		socket.on('userDisconnected', handleUserDisconnect)
// 		socket.on('userListUpdate', handleUserListUpdate)
//
// 		return () => {
// 			socket.off('newUserRegistered', handlerNewUser)
// 			socket.off('userDisconnected', handleUserDisconnect)
// 			socket.off('userListUpdate', handleUserListUpdate)
// 		}
// 	}, [addConnected, removeConnected, setConnected, setUsers])
// 	return null
// };
//
// export default UseUserSync;
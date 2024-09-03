import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import LogIn from "./pages/LogIn.jsx";
import Toolbar from "./components/Toolbar.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import SingleUser from "./pages/SingleUser.jsx";
import mainStore from "./store/mainStore.jsx";
import {useEffect} from "react";
import socket, {useSocket} from "./plugins/useSocket.jsx";
import Profile from "./pages/Profile.jsx";
import axios from "axios";
import ChatRooms from "./pages/ChatRooms.jsx";

function App() {


	const {setConnected, setUsers, setCurrentUser, users} = mainStore()

	useEffect(() => {
		const handleConnectedUsersUpdate = (users) => {
			// const users = Array.from(new Set(users.map(user => user.id)))
			// 	.map(id => users.find(user => user.id === id))
			setConnected(users)
		}
		socket.on('connectedUsersUpdate', handleConnectedUsersUpdate)

		return () => {
			socket.off('connectedUsersUpdate', handleConnectedUsersUpdate)
		}
	}, [setConnected])

	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:2000/getAllMembers');
			setUsers(response.data.users);
		} catch (error) {
			console.error('Error fetching users', error);
		}
	};

	useEffect(() => {
		fetchUsers();
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('currentUser');

		if (token && user) {
			setCurrentUser(JSON.parse(user));
			socket.emit('setUsername', JSON.parse(user));
		}
	}, [setUsers, setCurrentUser]);

	return (
		<>
			<BrowserRouter>
				<Toolbar/>
				<div className='p-2cd'>
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/register' element={<Register/>}/>
						<Route path='/login' element={<LogIn/>}/>
						<Route path='/users' element={<AllUsers/>}/>
						<Route path='/user/:name' element={<SingleUser/>}/>
						<Route path='/profile' element={<Profile/>}/>
						<Route path='/chat' element={<ChatRooms/>}/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App

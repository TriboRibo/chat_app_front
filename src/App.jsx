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

function App() {

	const {setConnected} = mainStore()

	useEffect(() => {
		const handleConnectedUsersUpdate = (users) => {
			setConnected(users)
		}
		socket.on('connectedUsersUpdate', handleConnectedUsersUpdate)
		return () => {
			socket.off('connectedUsersUpdate', handleConnectedUsersUpdate)
		}
	}, [setConnected])

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
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App

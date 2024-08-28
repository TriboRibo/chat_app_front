import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import LogIn from "./pages/LogIn.jsx";
import Toolbar from "./components/Toolbar.jsx";



function App() {


	return (
		<>
			<BrowserRouter>
				<Toolbar/>
				<div className='p-2cd'>
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/register' element={<Register/>}/>
						<Route path='/login' element={<LogIn/>}/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App

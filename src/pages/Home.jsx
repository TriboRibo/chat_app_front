import {useSocket} from '../plugins/useSocket.jsx'
import mainStore from "../store/mainStore.jsx";

const Home = () => {

	const {connected, setConnected} = mainStore()

	useSocket('connectedUsersUpdate', (users) => {
		setConnected(users)
	})


	return (
		<>
			<div className='flex justify-evenly'>
				<div className='user-list'>
					<h2>Connected Users: {connected ? connected.length : 0}</h2>
					{/*<h2>Connected Users: {connected.length}</h2>*/}
					<ul>
						{connected && connected.length > 0 ? (
							connected.map((user, index) => (
								<li key={index}>{user}</li>
							))
						) : (
							<li>no users</li>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
import {create} from 'zustand'

const useStore = create((set) => ({
	users: [],
	connected: [],
	currentUser: null,
	setUsers: (users) => set({users}),
	setConnected: (users) => set({connected: users}),
	setCurrentUser: (user) => set({currentUser: user}),
	removeConnected: (user) => set((state) => ({
		connected: state.connected.filter((connectedUser) => connectedUser !== user),
	})),
}))

export default useStore
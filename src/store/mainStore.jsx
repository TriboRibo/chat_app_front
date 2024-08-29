import {create} from 'zustand'

const useStore = create((set) => ({
	users: [],
	connected: [],
	setUsers: (users) => set({users}),
	setConnected: (users) => set({connected: users}),
	removeConnected: (user) => set((state) => ({
		connected: state.connected.filter((connectedUser) => connectedUser !== user),
	})),
}))

export default useStore
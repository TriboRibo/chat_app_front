import {create} from 'zustand'

const useStore = create((set) => ({
	users: [],
	connected: [],
	setUsers: (users) => set({users}),
	setConnected: (connected) => set({connected}),
	addUser: (user) => set((state) => ({
		users: [...state.users, user]
	})),
	addConnected: (user) => set((state) => ({
		connected: [...state.connected, user],
		users: [...state.users, user],
	})),
	removeConnected: (user) => set((state) => ({
		connected: state.connected.filter((user) => user !== user),
	}))
}))

export default useStore
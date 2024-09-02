import {create} from 'zustand'

const useStore = create((set) => ({
	users: [],
	connected: [],
	currentUser: null,
	messages: [],
	addMessages: (message) => set((state) => ({
		messages: [...state.messages, message],
	})),
	setUsers: (users) => set({users}),
	setConnected: (users) => set({connected: users}),
	setCurrentUser: (user) => set({currentUser: user}),
	setMessages: (newMessages) => set({messages: newMessages}),
	clearMessages: () => set({messages: []}),
	removeConnected: (user) => set((state) => ({
		connected: state.connected.filter((connectedUser) => connectedUser !== user),
	})),
}))

export default useStore
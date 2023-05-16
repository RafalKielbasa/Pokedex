import { createContext, useState } from 'react'

export const Context = createContext({})

const ContextProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([])
	const [battle, setBattle] = useState([])
	const [userData, setUserData] = useState([])

	return (
		<Context.Provider value={{ favorites, battle, userData }}>
			{children}
		</Context.Provider>
	)
}

export default ContextProvider

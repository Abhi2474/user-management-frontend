import React, { useEffect } from 'react'
import { Home, UserPage } from './page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice'

const store = configureStore({
	reducer: {
		userArray: userReducer
	}
})

useEffect(()=>{
	document.title = "User Management System"
},[])

function App() {

	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/:id' element={<UserPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>

		</>
	)
}

export default App

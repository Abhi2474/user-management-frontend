import React, { useReducer, useState } from 'react'
import { Home } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserPage from './page/UserPage';
import MyContext from './context';


const reducer = (state, action) => {
	switch (action.type) {
		case 'read':
			return state = action.payload
		case 'create':
			return [...state, action.payload]
		case 'delete':
			return state.filter(user=>user._id !== action.payload)
		case 'update':
			return state.map(user=>user._id === action.payload._id ? action.payload : user )
		default:
			return state
	}
}

function App() {
	const [usersRead, dispatch] = useReducer(reducer, [])
	const [isEdit, setIsEdit] = useState('')
	const [ editData, setEditData ] = useState({})


  return (
    <>
    <MyContext.Provider value={{ usersRead, dispatch, editData, setEditData, isEdit, setIsEdit }}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/:id' element={ <UserPage/> } />
    </Routes>
    </BrowserRouter>
    </MyContext.Provider>
      
    </>
  )
}

export default App

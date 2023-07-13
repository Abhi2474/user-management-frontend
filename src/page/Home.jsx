import React, { useReducer, useState } from 'react'
import UserBoard from '../components/UserBoard';
import UserForm from '../components/UserForm';
import UserPage from './UserPage';


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

const Home = () => {
	const [usersRead, dispatch] = useReducer(reducer, [])
	const [isEdit, setIsEdit] = useState('')
	const [ editData, setEditData ] = useState({})


	return (
		<>
			<h1 className='text-center text-5xl my-5 font-bold'>User Form</h1>
			<UserForm setIsEdit={setIsEdit} setEditData={setEditData} isEdit={isEdit} editData={editData} usersRead={usersRead} dispatch={dispatch}  />
			<UserBoard setIsEdit={setIsEdit} setEditData={setEditData} usersRead={usersRead} dispatch={dispatch} />
		</>
	)
}

export default Home
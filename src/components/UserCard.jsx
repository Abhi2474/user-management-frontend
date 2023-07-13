import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../context'

const UserCard = ({user}) => {
	const { dispatch, setIsEdit, setEditData } = useContext(MyContext)
	
	const deletUser = async (id) => {
		const { data } = await axios.delete(`http://localhost:3000/users/${id}`)
		dispatch({type: 'delete', payload: id})
		console.log(data);
	}

	const handleUpdate = (user)=>{
		setIsEdit(user._id)
		setEditData({
			name:user.name,
			email:user.email,
			phone:user.phone
		})
	}
	return (
		<>
			<tr>
				<td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
				<td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
				<td className="px-6 py-4 whitespace-nowrap"><Link to={`/${user._id}`} className='bg-blue-400 p-2 rounded-sm'>View</Link></td>
				<td className="px-6 py-4 whitespace-nowrap"><button className='bg-green-400 p-2 rounded-sm' onClick={()=>handleUpdate(user)}>Update</button></td>
				<td className="px-6 py-4 whitespace-nowrap"><button className='bg-red-400 p-2 rounded-sm' onClick={() => deletUser(user._id)} >Delete</button></td>
			</tr>
		</>
	)
}

export default UserCard
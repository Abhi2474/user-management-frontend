import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteUser, editUser } from '../slice/userSlice'

const UserCard = ({ user }) => {
	const dispatch = useDispatch()

	const deletUser = async (id) => {
		const { data } = await axios.delete(`${import.meta.env.VITE_DB_URL}/${id}`)
		dispatch(deleteUser(id))
		console.log(data);
	}

	const handleUpdate = (user) => {
		dispatch(editUser({
			id: user._id, data: {
				name: user.name,
				email: user.email,
				phone: user.phone
			}
		}))
	}
	return (
		<>
			<tr>
				<td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
				<td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
				<td className="px-6 py-4 whitespace-nowrap"><Link to={`/${user._id}`} className='bg-blue-400 p-2 rounded-sm'>View</Link></td>
				<td className="px-6 py-4 whitespace-nowrap"><button className='bg-green-400 p-2 rounded-sm' onClick={() => handleUpdate(user)}>Update</button></td>
				<td className="px-6 py-4 whitespace-nowrap"><button className='bg-red-400 p-2 rounded-sm' onClick={() => deletUser(user._id)} >Delete</button></td>
			</tr>
		</>
	)
}

export default UserCard
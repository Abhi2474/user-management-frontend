import axios from 'axios'
import React, { useState } from 'react'

const UserCard = ({ user }) => {
	const [isHover, setIsHover] = useState(false)
	const deletUser = async (id) => {
		const { data } = await axios.delete(`http://localhost:3000/users/${id}`)
		console.log(data);
	}
	return (
		<div className='my-4 bg-blue-400 w-1/4 p-5 rounded-sm' onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
			<ul className=''>
				<li>Name: {user.name}</li>
				<li>Email: {user.email}</li>
				<li>Phone: {user.phone}</li>
			</ul>
			<div className={`flex gap-4 text-white ${isHover ? 'opacity-100' : 'opacity-0'}`}>
				<button className='bg-green-700 p-2'>Update</button>
				<button onClick={() => deletUser(user._id)} className='bg-red-700 p-2'>Delete</button>
			</div>
		</div>
	)
}

export default UserCard
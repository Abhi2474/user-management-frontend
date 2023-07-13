import axios from 'axios'
import React, { useState } from 'react'

const UserForm = () => {

	const [userForm, setUserForm] = useState({
		name: '',
		email: '',
		phone: ''
	})

	const [errMsg, setErrMsg] = useState('')

	const postUserInfo = async (url) => {
		const { data } = await axios.post(url, userForm)
		console.log(data);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!userForm.email || !userForm.name || !userForm.phone) {
			setErrMsg('All fields are mandatory')
		}
		else{
			postUserInfo("http://localhost:3000/users").then(()=>{
				setUserForm({
					name: '',
					email: '',
					phone: ''
				})
			})
			

		}


	}

	const handleChange = (e) => {
		setErrMsg('')
		setUserForm({ ...userForm, [e.target.name]: e.target.value })

	}

	return (
		<form className='bg-red-300 p-10 mb-20' onSubmit={handleSubmit}>
			<label>
				Name
				<input name='name' type="text" value={userForm.name}
					className='rounded-sm mx-3 py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<label>
				Email
				<input name='email' type="email" value={userForm.email}
					className='rounded-sm mx-3 py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<label>
				Phone
				<input name='phone' type="tel" value={userForm.phone}
					minLength={6} maxLength={10} className='rounded-sm mx-3 py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<button type='submit'>Submit</button>
			{errMsg.length>0 ? <p>{errMsg}</p> : ''}
		</form>
	)
}

export default UserForm
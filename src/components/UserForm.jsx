import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context'

const UserForm = () => {
	const { usersRead, dispatch, editData, isEdit, setIsEdit, setEditData } = useContext(MyContext)

	const [userForm, setUserForm] = useState({
		name: '',
		email: '',
		phone: ''
	})

	const [errMsg, setErrMsg] = useState('')

	const postUserInfo = async (url) => {
		const { data } = await axios.post(url, userForm)
		dispatch({ type: 'create', payload: data })
		console.log(data);
	}

	const updateUserInfo = async (id) => {
		console.log(id);
		console.log(userForm);
		const { data } = await axios.put(`http://localhost:3000/users/${id}`, userForm)
		dispatch({ type: 'update', payload: data })
		console.log(data);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (!userForm.email || !userForm.name || !userForm.phone) {
				setErrMsg('All fields are mandatory')
			}
			else if (isEdit) {
				updateUserInfo(isEdit).then(() => {
					setEditData({})
					setIsEdit('')

					setUserForm({
						name: '',
						email: '',
						phone: ''
					})
				})

			}
			else {
				postUserInfo("http://localhost:3000/users").then(() => {
					setUserForm({
						name: '',
						email: '',
						phone: ''
					})
				})
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (isEdit) {
			setUserForm(editData)
			console.log('no data');
		}
	}, [isEdit])

	const handleChange = (e) => {
		setErrMsg('')
		setUserForm({ ...userForm, [e.target.name]: e.target.value })

	}

	return (
		<form className='bg-red-300 p-10 mb-20 mx-auto w-1/3 flex flex-col rounded-sm' onSubmit={handleSubmit}>
			<label className='flex my-3 justify-between flex-col w-3/4 mx-auto'>
				Name
				<input name='name' type="text" value={userForm.name}
					className='rounded-sm py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<label className='flex my-3 justify-between flex-col w-3/4 mx-auto'>
				Email
				<input name='email' type="email" value={userForm.email}
					className='rounded-sm py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<label className='flex my-3 justify-between flex-col w-3/4 mx-auto'>
				Phone
				<input name='phone' type="tel" value={userForm.phone}
					minLength={6} maxLength={10} className='rounded-sm py-1 px-2 focus:outline-none'
					onChange={handleChange}
				/>
			</label>
			<div className='flex'>
				<button type='submit' className='mx-auto bg-red-600 px-2 py-1 rounded-sm text-white font-bold my-3'>{isEdit ? 'Update' : 'Submit'}</button>
				<button type='reset' className='mx-auto bg-red-600 px-2 py-1 rounded-sm text-white font-bold my-3' onClick={() => {
					setUserForm({
						name: '',
						email: '',
						phone: ''
					})
					setErrMsg('')
				}}>Reset</button>
			</div>
			<p className='text-center text-red-700 font-bold'>{errMsg.length > 0 ? <p>*{errMsg}</p> : ''}</p>
		</form>
	)
}

export default UserForm
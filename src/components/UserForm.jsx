import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create, emptyEditUser, update } from '../slice/userSlice'

const initialForm = {
	name: '',
	email: '',
	phone: ''
}


const UserForm = () => {

	const userEdit = useSelector(state => state.userArray.userEdit)
	const userEditId = useSelector(state => state.userArray.userEditId)
	const dispatch = useDispatch()

	const [errMsg, setErrMsg] = useState('')


	const [userForm, setUserForm] = useState(initialForm)

	const input_form = [
		{
			name: "name",
			label: "Name",
			type: 'text',
			value: userForm.name,
		},
		{
			name: "email",
			label: "Email",
			type: 'email',
			value: userForm.email,
		},
		{
			name: "phone",
			label: "Phone",
			type: 'tel',
			value: userForm.phone,
			characters: { min: 6, max: 10 }
		},
	]



	const postUserInfo = async (url) => {
		try {
			const { data } = await axios.post(url, userForm)
			dispatch(create(data))
			console.log(data);

		} catch (error) {
			console.log(error, error.message);
		}
	}

	const updateUserInfo = async (id) => {
		const { data } = await axios.put(`http://localhost:3000/users/${id}`, userForm)
		dispatch(update({ ...userForm, _id: userEditId }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (!userForm.email || !userForm.name || !userForm.phone) {
				setErrMsg('All fields are mandatory')
			}

			else if (userEditId) {
				updateUserInfo(userEditId).then(() => {
					dispatch(emptyEditUser())
					setUserForm(initialForm)
				})
			}

			else {
				postUserInfo("http://localhost:3000/users").then(() => {
					setUserForm(initialForm)
				})
			}
		} catch (error) {
			setErrMsg(error)
			console.log(error);
		}
	}

	useEffect(() => {
		if (userEditId) {
			setUserForm(userEdit)
		}
	}, [userEditId])

	const handleChange = (e) => {
		setErrMsg('')
		setUserForm({ ...userForm, [e.target.name]: e.target.value })

	}

	
	return (
		<form className='bg-red-300 p-10 mb-20 mx-auto w-1/3 flex flex-col rounded-sm' onSubmit={handleSubmit}>
			{
				input_form.map((input, id) => {
					return (
						<label key={id} className='flex my-3 justify-between flex-col w-3/4 mx-auto'>
							{input.label}
							<input name={input.name} type={input.type} value={input.value}
								className='rounded-sm py-1 px-2 focus:outline-none'
								onChange={handleChange}
								minLength={input.characters?.min}
								maxLength={input.characters?.max}
							/>
						</label>
					)
				})
			}
			<div className='flex'>
				<button type='submit' className='mx-auto bg-red-600 px-2 py-1 rounded-sm text-white font-bold my-3'>{userEditId ? 'Update' : 'Submit'}</button>
				<button type='reset' className='mx-auto bg-red-600 px-2 py-1 rounded-sm text-white font-bold my-3' onClick={() => {
					dispatch(emptyEditUser())
					setUserForm(initialForm)
					setErrMsg('')
				}}>Reset</button>
			</div>
			<p className='text-center text-red-700 font-bold'>{errMsg.length > 0 ? <p>*{errMsg}</p> : ''}</p>
		</form>
	)
}

export default UserForm
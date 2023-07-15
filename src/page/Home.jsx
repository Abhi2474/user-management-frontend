import React from 'react'
import { UserBoard, UserForm } from '../components';

const Home = () => {

	return (
		<>
			<h1 className='text-center text-5xl my-5 font-bold'>User Form</h1>
			<UserForm />
			<UserBoard />
		</>
	)
}

export default Home
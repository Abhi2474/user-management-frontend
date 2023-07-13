import React from 'react'
import UserBoard from '../components/UserBoard';
import UserForm from '../components/UserForm';

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
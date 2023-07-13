import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';

const Home = () => {
	const [users,setUsers] = useState([])
  
	const fetchData = async (url) => {
	  try {
		const { data } = await axios.get(url);
		if (data) {
		  setUsers(data);
		}
	  } catch (error) {
		// Handle the error here
		console.error('Error fetching data:', error);
	  }
	};
	
  
	useEffect(()=>{
	  fetchData('http://localhost:3000/users')
	},[users])
  return (
	<div className='flex flex-wrap gap-16 p-10'>
		{
			users.map((user)=>{
				return (
					<UserCard key={user._id} user={user}/>
				)
			})
		}
	</div>
  )
}

export default Home
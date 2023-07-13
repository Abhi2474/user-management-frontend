import axios from 'axios';
import React, { useEffect, useMemo } from 'react'
import UserCard from './UserCard';

const UserBoard = ({ usersRead, dispatch, setIsEdit, setEditData }) => {


	const fetchData = async (url) => {
		try {
			const { data } = await axios.get(url);
			if (data) {
				dispatch({ type: 'read', payload: data })
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData('http://localhost:3000/users')
		console.log('main fetch');
	}, [])


	return (
		<>
			<table className="min-w-full border divide-y divide-gray-200 mb-40 ">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">name</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">view</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">

					{
						usersRead.map((user) => {
							return (
								<UserCard setIsEdit={setIsEdit} setEditData={setEditData} dispatch={dispatch}  key={user._id} user={user} />
							)
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default UserBoard
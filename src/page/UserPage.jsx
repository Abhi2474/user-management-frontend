import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const [singleUser, setSingleUser] = useState({})
  const params = useParams()

  useEffect(() => {
    const fetchSingleUser = async (id) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`)
        if (data) {
          setSingleUser(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchSingleUser(params.id)
  }, [])

  const tableHeading = ['id', 'name', 'email', 'phone']

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {
              tableHeading.map((item, id) => {
                return (
                  <th key={id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">{item}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">{singleUser._id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{singleUser.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{singleUser.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{singleUser.phone}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default UserPage
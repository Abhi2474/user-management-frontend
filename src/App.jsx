import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [user,setUser] = useState([])
  
  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      // Handle the error here
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(()=>{
    fetchData('http://localhost:3000/user')
  },[])

  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default App

import React from 'react'
import { Home } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserPage from './page/UserPage';

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/:id' element={ <UserPage/> } />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App

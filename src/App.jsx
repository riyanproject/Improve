import React from 'react'
import Home from './Components/Home/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Player from './Components/Player/Player'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='player/:id' element={<Player/>}/>
      </Routes>
     
    </div>
  )
}

export default App
import React from 'react'
import './Navbar.css'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="improve-logo">Improve</div>
      <div className="goals">GOALS <textarea id="expandingTextarea" placeholder="Start typing..."></textarea></div>
      <div className="profile">
      <a onClick={()=>{logout()}}>Profile</a></div>
    </div>
  )
}

export default Navbar
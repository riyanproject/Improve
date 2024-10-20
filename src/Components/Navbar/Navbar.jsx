import React from 'react'
import './Navbar.css'
import caret_icon from '../../assets/caret_icon.svg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="improve-logo">Improve</div>
      <div className="goals">GOALS <textarea id="expandingTextarea" placeholder="Start typing..."></textarea></div>
      <div className="profile"><a>Profile</a><img className='caret-icon' src={caret_icon}  /></div>
    </div>
  )
}

export default Navbar
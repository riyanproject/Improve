import React from 'react';
import './Navbar.css';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link } from 'react-router-dom';  // Import Link

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="improve-logo">Improve</div>
      <div className="goals">GOALS <textarea id="expandingTextarea" placeholder="Start typing..."></textarea></div>
      
      {/* Wrap "Inventory" with Link to route to new path */}
      <div className="inventory">
        <Link to="/inventory" className="inventory-link" style={{ textDecoration: 'none' }}>Inventory</Link>  {/* Specify the route */}
      </div>
      
      <div className="profile">
        <a onClick={() => { logout() }}>Sign In</a>
      </div>
    </div>
  );
}

export default Navbar;

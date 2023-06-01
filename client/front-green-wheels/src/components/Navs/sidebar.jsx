import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../../CSS/sidebar.css';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>My App</h1>
      </div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <FaHome className="icon" />
          <span>Home</span>
        </div>
        <div
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <FaUser className="icon" />
          <span>Profile</span>
        </div>
        <div
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          <FaCog className="icon" />
          <span>Settings</span>
        </div>
        <div
          className={`tab ${activeTab === 'logout' ? 'active' : ''}`}
          onClick={() => handleTabClick('logout')}
        >
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>
      <div className="content">
        {activeTab === 'home' && <h2>Home Content</h2>}
        {activeTab === 'profile' && <h2>Profile Content</h2>}
        {activeTab === 'settings' && <h2>Settings Content</h2>}
        {activeTab === 'logout' && <h2>Logout Content</h2>}
      </div>
    </div>
  );
};

export default Sidebar;

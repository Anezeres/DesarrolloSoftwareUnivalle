import React from 'react';

const Navbar = () => {
  return (
    <nav>
        <div class="navbar">
        <div class="logo"><a href="/">CodingLab</a></div>
        <ul class="menu">
            <li><a href="/">Home</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Category">Category</a></li>
            <li><a href="#Contact">Contact</a></li>
            <li><a href="#Feedback">Feedback</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>
        </div>
    </nav>
  );
};

export default Navbar;


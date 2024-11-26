import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = ({ sectionRefs }) => {
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    });
  }, []);

  // Função para rolar até a seção correspondente
  const scrollToSection = (section) => {
    if (sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('courses')}>Courses</li>
          <li onClick={() => scrollToSection('lessons')}>Lessons</li>
          <li onClick={() => scrollToSection('articles')}>Articles</li>
          <li onClick={() => scrollToSection('others')}>Others</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

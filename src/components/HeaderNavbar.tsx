import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './HeaderNavbar.css';
import { FiSearch, FiMenu } from 'react-icons/fi';
import Search from './Search'

const HeaderNavbar: React.FC = () => {

    const [isActive, setIsActive] = useState(false);
  
    const inputRef = useRef<HTMLInputElement>(null);
      const navigate = useNavigate();
  
    const handleSearchClick = () => {
      setIsActive(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Show search button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    if (window.location.pathname === path) {
      window.scrollTo(0, 0);
    } else {
      navigate(path);
    }
  };

  return (
    <header className="header-navbar">
      <span className='header-homebutton'>
              <button onClick={() => handleNavigate('/')} className="header-homebutton-button">
              მთავარი
              </button>
      </span>

      <Search isActive={isActive} setIsActive={setIsActive} inputRef={inputRef}/>

      <div className="header-right">
        {showSearch && (
          <button className="search-button" onClick={ handleSearchClick }>
            <FiSearch />

          </button>
        )}

        <button className="menu-button" onClick={() => setIsOpen(true)}><FiMenu /></button>
      </div>

      <nav className={`sidebar ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className='close-button-box'>
          <button className="close-button" onClick={() => setIsOpen(false)}>&times;</button>
        </div>

        <div className='nav-content'>
          <ul>
            <li className='navbar-homebutton'><Link to="/" onClick={() => setIsOpen(false)}>მთავარი</Link></li>
            <li><Link to="/profile" onClick={() => setIsOpen(false)}>პროფილი</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>ჩვენს შესახებ</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>კონტაქტი</Link></li>

          </ul>
          <Link to="/signinsignup" onClick={() => setIsOpen(false)} className='signinsignup-button-header'>შესვლა</Link>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
    </header>
  );
};

export default HeaderNavbar;

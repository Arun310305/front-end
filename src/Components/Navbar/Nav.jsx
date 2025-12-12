import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import styles from './Nav.module.css';

function Nav() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [labelStyles, setLabelStyles] = useState({});
  const navbarRef = useRef(null);
  const location = useLocation(); // Get the current location

  const navItems = [
    { path: '/name', icon: '/icons/home.png', label: 'Home', id: 'home' },
    { path: '/projects', icon: '/icons/folder.png', label: 'Projects', id: 'projects' },
    { path: '/Experience', icon: '/icons/suitcase.png', label: 'Experience', id: 'experience' },
    { path: '/tools', icon: '/icons/skills.png', label: 'Tools', id: 'tools' },
    { path: '/blogs', icon: '/icons/blogger.png', label: 'Blogs', id: 'blogs' },
    { 
  path: null, 
  icon: '/icons/download (1).png', 
  label: 'Resume', 
  id: 'resume', 
  download: true 
},

  ];

  const handleMouseEnter = (itemId, event) => {
    setHoveredItem(itemId);
    
    if (navbarRef.current) {
      const navbar = navbarRef.current;
      const navbarRect = navbar.getBoundingClientRect();
      const itemRect = event.currentTarget.getBoundingClientRect();
      
      setLabelStyles({
        top: navbarRect.bottom + 15,
        left: itemRect.left + itemRect.width / 2
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  
  // *** NEW FUNCTION FOR SCROLLING ***
  const handleLinkClick = (itemId, path) => (event) => {
    if (location.pathname === path) {
      event.preventDefault(); 
      
      const targetElement = document.getElementById(itemId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }

  };

  return (
    <div className={styles.navContainer}>
      <nav ref={navbarRef}>
        <ul>
          {navItems.map((item) => (
            <li 
  key={item.id}
  onMouseEnter={(e) => handleMouseEnter(item.id, e)}
  onMouseLeave={handleMouseLeave}
>
  {item.download ? (
    // ⬇️ Download Resume Button
    <a
      href="/resume.pdf"
      download="Resume.pdf"
      // style={{ display: "inline-block" }}
    >
      <img src={item.icon} alt={item.label} />
    </a>
  ) : (
    // ⬇️ Normal Navigation Links
    <Link 
      to={item.path} 
      onClick={handleLinkClick(item.id, item.path)}
    >
      <img src={item.icon} alt={item.label} />
    </Link>
  )}

  {hoveredItem === item.id && (
    <span 
      className={styles.navLabel}
      style={{
        top: `${labelStyles.top}px`,
        left: `${labelStyles.left}px`
      }}
    >
      {item.label}
    </span>
  )}
</li>

          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
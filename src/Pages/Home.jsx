import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import styles from '../Components/Navbar/Nav.module.css';

function Home() 
{
   const [hoveredItem, setHoveredItem] = useState(null);
    const [labelStyles, setLabelStyles] = useState({});
    const navbarRef = useRef(null);
    const location = useLocation();
  
    const navItems = [
      { path: '/', icon: '/icons/home.png', label: 'Home', id: 'home' },
      { path: '/projects', icon: '/icons/folder.png', label: 'Projects', id: 'projects' },
      { path: '/Experience', icon: '/icons/suitcase.png', label: 'Experience', id: 'experience' },
      { path: '/tools', icon: '/icons/skills.png', label: 'Tools', id: 'tools' },
      { path: '/blogs', icon: '/icons/blogger.png', label: 'Blogs', id: 'blogs' }
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
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/projects");
          const data = await res.json();
          setProjects(data);
        } catch (err) {
          console.error("❌ Error fetching projects:", err);
        }
      };
      fetchProjects();
    }, []);
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
                <Link 
                  to={item.path} 
                  onClick={handleLinkClick(item.id, item.path)} // *** Attach the new click handler ***
                > 
                  <img src={item.icon} alt={item.label} />
                </Link>
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
         <section id="projects" className={styles.maincontainer}>
              <div className={styles.recent}>
                <h2 className={styles.head}>RECENT</h2>
                <h2 className={styles.pro}>PROJECTS</h2>
              </div>
        
              <div className={styles.projodiv}>
                {projects.map((proj) => (
                  <div key={proj._id} className={styles.projcard}>
                    <div className={styles.projimg}>
            <img
               src={proj.image ? `http://localhost:5000${proj.image}` : "/fallback-image.jpg"}
               alt={proj.name}
             />
                    </div>
                    <div className={styles.projtxt}>
                      <p className={styles.projhead}>{proj.name}</p>
                      <p className={styles.projdes}>{proj.description}</p>
                    </div>
                    {proj.link && (
                      <div className={styles.upicon}>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                          <svg
                            className={styles.upiconsvg}
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="7"
                              y1="17"
                              x2="17"
                              y2="7"
                              stroke={"#ff6b35"}
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <polyline
                              points="13,7 17,7 17,11"
                              stroke={"#ff6b35"}
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
               
      </div>
    );

}
export default Home ;
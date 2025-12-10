import React, { useState } from 'react';
import '../Styles/Header.css';

const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'contact', label: 'Kontak' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.headerContainer}>
        <a href="#home" className="logo" style={styles.logo}>
          <i className="fas fa-mug-hot" style={styles.logoIcon}></i> jalita <span style={styles.logoSpan}>Cafe</span>
        </a>
        
        <nav>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} style={styles.navMenu}>
            {navItems.map(item => (
              <li key={item.id} style={styles.navItem}>
                <a 
                  href={`#${item.id}`} 
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={closeMenu}
                  style={activeSection === item.id ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            style={styles.hamburger}
          >
            <span className="bar" style={styles.bar}></span>
            <span className="bar" style={styles.bar}></span>
            <span className="bar" style={styles.bar}></span>
          </div>
        </nav>
      </div>

      {/* CSS untuk responsive */}
      <style>{`
        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #edad7f;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: #edad7f;
        }
        
        @media (max-width: 768px) {
          .hamburger {
            display: flex !important;
          }
          
          .nav-menu {
            position: fixed !important;
            left: -100% !important;
            top: 70px !important;
            flex-direction: column !important;
            background-color: white !important;
            width: 100% !important;
            text-align: center !important;
            transition: 0.3s !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
            padding: 20px 0 !important;
            z-index: 999 !important;
          }
          
          .nav-menu.active {
            left: 0 !important;
          }
          
          .nav-menu li {
            margin: 15px 0 !important;
          }
          
          .nav-link {
            font-size: 1.2rem !important;
          }
          
          .hamburger.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px) !important;
          }
          
          .hamburger.active .bar:nth-child(2) {
            opacity: 0 !important;
          }
          
          .hamburger.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px) !important;
          }
        }
      `}</style>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    padding: '15px 0',
    transition: 'all 0.3s ease'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#edad7f',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  logoIcon: {
    marginRight: '10px',
    color: '#D4A76A'
  },
  logoSpan: {
    color: '#2C1810'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none'
  },
  navItem: {
    marginLeft: '30px'
  },
  navLink: {
    color: '#2C1810',
    textDecoration: 'none',
    fontWeight: 500,
    position: 'relative',
    padding: '5px 0',
    transition: 'all 0.3s ease'
  },
  activeLink: {
    color: '#edad7f'
  },
  hamburger: {
    display: 'none',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '5px'
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#2C1810',
    transition: 'all 0.3s ease'
  }
};

export default Header;
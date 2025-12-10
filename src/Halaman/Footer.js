import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="footer-content" style={styles.footerContent}>
          <div className="footer-logo" style={styles.footerLogo}>
            <a href="#home" className="logo" style={styles.logo}>
              <i className="fas fa-mug-hot" style={styles.logoIcon}></i> Jalita <span style={styles.logoSpan}>Cafe</span>
            </a>
            <p style={styles.description}>
              Tempat nongkrong modern dengan kopi terbaik dan makanan lezat. 
              Nikmati momen spesial Anda bersama kami.
            </p>
            <div className="social-icons" style={styles.socialIcons}>
              <a 
                href="https://www.instagram.com/bayurendraa?igsh=MWRqMHg1c3Y1MDg5dQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="http://www.tiktok.com/@baayyskak" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a 
                href="https://www.facebook.com/share/1Bxoo1EKKH/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={styles.footerBottom}>
          <p>&copy; 2025 Jalita Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2C1810',
    color: 'white',
    padding: '60px 0 20px'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    marginBottom: '40px'
  },
  footerLogo: {
    gridColumn: '1 / -1',
    textAlign: 'center'
  },
  logo: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#edad7f',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  logoIcon: {
    marginRight: '10px',
    color: '#D4A76A'
  },
  logoSpan: {
    color: 'white'
  },
  description: {
    margin: '20px 0',
    color: '#bbb',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px'
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    color: 'white',
    fontSize: '1.2rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#bbb'
  }
};

const footerStyleSheet = document.createElement('style');
footerStyleSheet.textContent = `
  .social-icons a:hover {
    background-color: #edad7f;
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
`;

document.head.appendChild(footerStyleSheet);

export default Footer;
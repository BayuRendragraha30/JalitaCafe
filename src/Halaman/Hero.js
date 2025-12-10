import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero" style={styles.hero}>
      <div className="container">
        <div className="hero-content" style={styles.heroContent}>
          <div className="hero-text-container" style={styles.heroTextContainer}>
            <h1 className="hero-title" style={styles.heroTitle}>
              Rasakan Kenikmatan<br />Kopi Terbaik
            </h1>
            <p className="hero-subtitle" style={styles.heroSubtitle}>
              Di Jolita Cafe, kami menyajikan kopi berkualitas dengan suasana yang nyaman 
              untuk setiap momen spesial Anda.
            </p>
          </div>
          
          <div className="hero-buttons" style={styles.heroButtons}>
            <a href="#menu" className="btn-primary" style={styles.btnPrimary}>
              Menu Kami
            </a>
            <a href="#gallery" className="btn-secondary" style={styles.btnSecondary}>
              Lihat Galeri
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS untuk efek tambahan */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-title {
          animation: fadeIn 1s ease-out;
        }
        
        .hero-subtitle {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        
        .hero-buttons {
          animation: fadeIn 1s ease-out 0.6s both;
        }
        
        .btn-primary:hover {
          background-color: #e09a6b !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 20px rgba(237, 173, 127, 0.4) !important;
        }
        
        .btn-secondary:hover {
          background-color: #edad7f !important;
          color: white !important;
          transform: translateY(-3px) !important;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(44, 24, 16, 0.2), rgba(237, 173, 127, 0.1));
          z-index: 1;
        }
        
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 2.8rem !important;
            line-height: 1.1 !important;
          }
          
          .hero p {
            font-size: 1.1rem !important;
            max-width: 90% !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.3rem !important;
          }
          
          .hero p {
            font-size: 1rem !important;
            margin: 20px auto 30px !important;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px !important;
            margin-top: 30px !important;
          }
          
          .hero-buttons a {
            width: 100%;
            max-width: 250px;
          }
        }
        
        @media (max-width: 576px) {
          .hero {
            height: 90vh !important;
          }
          
          .hero h1 {
            font-size: 2rem !important;
            margin-bottom: 15px !important;
          }
          
          .hero p {
            font-size: 0.95rem !important;
            margin-bottom: 25px !important;
          }
          
          .hero-content {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  hero: {
    height: '100vh',
    minHeight: '600px',
    background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80) no-repeat center center/cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    marginTop: '70px',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  heroTextContainer: {
    marginBottom: '40px',
    maxWidth: '700px'
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '25px',
    color: 'white',
    lineHeight: '1.2',
    fontFamily: "'Playfair Display', serif",
    fontWeight: '700',
    letterSpacing: '0.5px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: '1.8',
    fontWeight: '300',
    maxWidth: '650px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    display: 'inline-block',
    padding: '16px 40px',
    backgroundColor: '#edad7f',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(237, 173, 127, 0.3)',
    letterSpacing: '0.5px',
    minWidth: '200px',
    textAlign: 'center'
  },
  btnSecondary: {
    display: 'inline-block',
    padding: '16px 40px',
    backgroundColor: 'transparent',
    color: '#edad7f',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: '2px solid #edad7f',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    minWidth: '200px',
    textAlign: 'center'
  }
};

export default Hero;
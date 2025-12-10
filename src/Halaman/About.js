import React from 'react';

const About = () => {
  const features = [
    {
      icon: '☕',
      title: 'Kopi Premium',
      description: 'Biji kopi pilihan dari perkebunan terbaik'
    },
    {
      icon: '🥐',
      title: 'Makanan Lezat',
      description: 'Disajikan setiap hari dengan bahan-bahan berkualitas'
    },
    {
      icon: '📶',
      title: 'WiFi Gratis',
      description: 'Akses Internet cepat untuk kebutuhan Anda'
    },
    {
      icon: '🎵',
      title: 'Live Music',
      description: 'Setiap akhir pekan dengan musisi lokal'
    }
  ];

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="section-header" style={styles.sectionHeader}>
          <h2 className="section-title" style={styles.sectionTitle}>Tentang Jalita Cafe</h2>
          <p className="section-subtitle" style={styles.sectionSubtitle}>
            Cerita di balik secangkir kopi terbaik kami
          </p>
          <div className="divider" style={styles.divider}></div>
        </div>
        
        <div className="about-content">
          <div className="about-text" style={styles.aboutText}>
            <h3 className="experience-title" style={styles.experienceTitle}>
              Pengalaman Kopi yang Tak<br />Terlupakan
            </h3>
            <p className="about-description" style={styles.aboutDescription}>
              Jalita Cafe didirikan pada tahun 2020 dengan misi sederhana: 
              menyajikan kopi terbaik dengan suasana yang hangat dan nyaman. 
              Kami dengan hati-hati memilih biji kopi terbaik dari petani lokal dan internasional.
            </p>
            <p className="about-description" style={styles.aboutDescription}>
              Setiap cangkir kopi diracik oleh barista profesional kami yang telah 
              terlatih untuk memberikan pengalaman kopi yang tak terlupakan bagi setiap pelanggan.
            </p>
          </div>
          
          <div className="features-grid" style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div className="feature-card" key={index} style={styles.featureCard}>
                <div className="feature-icon" style={styles.featureIcon}>{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-title" style={styles.featureTitle}>{feature.title}</h4>
                  <p className="feature-description" style={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .about {
          background: linear-gradient(135deg, #F9F5F0 0%, #F5F1E8 100%);
          position: relative;
        }
        
        .about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #edad7f, #D4A76A);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .section-header {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .about-text {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }
        
        .feature-card:nth-child(1) { animation: fadeInUp 0.6s ease-out 0.3s both; }
        .feature-card:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.4s both; }
        .feature-card:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.5s both; }
        .feature-card:nth-child(4) { animation: fadeInUp 0.6s ease-out 0.6s both; }
        
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          
          .feature-card {
            padding: 15px !important;
          }
          
          .experience-title {
            font-size: 1.8rem !important;
            line-height: 1.3 !important;
          }
          
          .about-description {
            font-size: 0.95rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 2rem !important;
          }
          
          .section-subtitle {
            font-size: 1rem !important;
          }
          
          .experience-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: '#2C1810',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    marginBottom: '15px'
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px'
  },
  divider: {
    width: '80px',
    height: '3px',
    backgroundColor: '#edad7f',
    margin: '0 auto',
    borderRadius: '2px'
  },
  aboutText: {
    maxWidth: '800px',
    margin: '0 auto 50px',
    textAlign: 'center'
  },
  experienceTitle: {
    fontSize: '2.2rem',
    color: '#2C1810',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    lineHeight: '1.3',
    marginBottom: '25px'
  },
  aboutDescription: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.7',
    marginBottom: '20px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f0f0f0',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px'
  },
  featureIcon: {
    fontSize: '2.5rem',
    minWidth: '60px'
  },
  featureTitle: {
    fontSize: '1.3rem',
    color: '#2C1810',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    marginBottom: '10px'
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5'
  }
};

export default About;
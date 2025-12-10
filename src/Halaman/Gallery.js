import React from 'react';

const Gallery = () => {
  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Barista Professional'
    },
    {
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Interior Nyaman'
    },
    {
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Makanan Lezat'
    },
    {
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Pizza Special'
    }
  ];

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <div className="section-header" style={styles.sectionHeader}>
          <h2 className="section-title" style={styles.sectionTitle}>Galeri Kami</h2>
          <p className="section-subtitle" style={styles.sectionSubtitle}>
            Momen-momen indah di Jalita Cafe
          </p>
          <div className="divider" style={styles.divider}></div>
        </div>
        
        <div className="gallery-grid" style={styles.galleryGrid}>
          {galleryItems.map((item, index) => (
            <div className="gallery-item" key={index} style={styles.galleryItem}>
              <div className="image-container" style={styles.imageContainer}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={styles.image}
                  loading="lazy"
                />
                <div className="image-overlay" style={styles.imageOverlay}>
                  <div className="overlay-content" style={styles.overlayContent}>
                    <h4 className="image-title" style={styles.imageTitle}>{item.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .gallery {
          background-color: #fff;
          position: relative;
        }
        
        .gallery::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #edad7f, #D4A76A);
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }
        
        .image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .image-container:hover::before {
          opacity: 1;
        }
        
        .image-container:hover img {
          transform: scale(1.1);
        }
        
        .image-container:hover .image-overlay {
          opacity: 1;
          transform: translateY(0);
        }
        
        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 2;
        }
        
        @keyframes fadeIn {
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
          animation: fadeIn 0.6s ease-out;
        }
        
        .gallery-item:nth-child(1) { animation: fadeIn 0.6s ease-out 0.2s both; }
        .gallery-item:nth-child(2) { animation: fadeIn 0.6s ease-out 0.3s both; }
        .gallery-item:nth-child(3) { animation: fadeIn 0.6s ease-out 0.4s both; }
        .gallery-item:nth-child(4) { animation: fadeIn 0.6s ease-out 0.5s both; }
        
        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .gallery-item {
            height: 300px !important;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
          
          .section-subtitle {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .gallery-item {
            height: 250px !important;
          }
          
          .image-title {
            font-size: 1.2rem !important;
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
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '25px'
  },
  galleryItem: {
    height: '350px'
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '25px',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))'
  },
  overlayContent: {
    textAlign: 'center'
  },
  imageTitle: {
    color: 'white',
    fontSize: '1.4rem',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    margin: 0,
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
  }
};

export default Gallery;
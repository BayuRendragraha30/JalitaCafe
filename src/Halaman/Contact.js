import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    const subject = `Pesan dari ${name} - Jalita Cafe`;
    const body = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${message}%0D%0A%0D%0A---%0D%0APesan ini dikirim dari website Jalita Cafe.`;
    
    window.location.href = `mailto:bayurendragraha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      alert(`Terima kasih ${name}! Email client Anda akan terbuka. Silakan kirim email dari aplikasi email Anda.`);
    }, 500);
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Lokasi',
      details: ['Jl. Kemang Selatan No.20, Jakarta Selatan']
    },
    {
      icon: 'fas fa-clock',
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 07:00 - 22:00', 'Sabtu - Minggu: 08:00 - 23:00']
    },
    {
      icon: 'fas fa-phone',
      title: 'Telepon',
      details: ['(021) 1234-5678', '+62 085779420783']
    },
    {
      icon: 'fab fa-instagram',
      title: 'Instagram',
      details: [
        <a 
          href="https://www.instagram.com/bayurendraa?igsh=MWRqMHg1c3Y1MDg5dQ%3D%3D&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          key="instagram"
          style={styles.link}
        >
          @jalitacafe
        </a>
      ]
    }
  ];

  return (
    <section id="contact" className="contact section-padding" style={styles.section}>
      <div className="container">
        <div className="section-title">
          <h2>Kunjungi Kami</h2>
          <p>Datang dan nikmati pengalaman kopi terbaik</p>
        </div>
        
        <div className="contact-content" style={styles.contactContent}>
          <div className="contact-info" style={styles.contactInfo}>
            {contactInfo.map((info, index) => (
              <div className="info-item" key={index} style={styles.infoItem}>
                <i className={info.icon} style={styles.infoIcon}></i>
                <div>
                  <h4 style={styles.infoTitle}>{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} style={styles.infoDetail}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="contact-form" style={styles.contactForm}>
            <h3 style={styles.formTitle}>Kirim Pesan</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  required
                  style={styles.input}
                />
              </div>
              <div className="form-group" style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Alamat Email"
                  required
                  style={styles.input}
                />
              </div>
              <div className="form-group" style={styles.formGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Pesan Anda"
                  required
                  style={styles.textarea}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#F5F1E8'
  },
  contactContent: {
    display: 'flex',
    gap: '50px'
  },
  contactInfo: {
    flex: 1
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '30px'
  },
  infoIcon: {
    fontSize: '1.5rem',
    color: '#edad7f',
    marginRight: '15px',
    marginTop: '5px'
  },
  infoTitle: {
    fontSize: '1.2rem',
    marginBottom: '5px',
    color: '#2C1810',
    fontFamily: "'Playfair Display', serif"
  },
  infoDetail: {
    color: '#555',
    marginBottom: '5px'
  },
  link: {
    color: '#edad7f',
    textDecoration: 'none'
  },
  contactForm: {
    flex: 1,
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
  },
  formTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#2C1810',
    fontFamily: "'Playfair Display', serif"
  },
  formGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    resize: 'vertical'
  }
};

const contactStyleSheet = document.createElement('style');
contactStyleSheet.textContent = `
  @media (max-width: 992px) {
    .contact-content {
      flex-direction: column;
    }
  }
`;

document.head.appendChild(contactStyleSheet);

export default Contact;
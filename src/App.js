import React, { useState, useEffect } from 'react';
import Header from './Halaman/Header';
import Hero from './Halaman/Hero';
import About from './Halaman/About';
import Menu from './Halaman/Menu'; // Import Menu
import Gallery from './Halaman/Gallery';
import Contact from './Halaman/Contact';
import Footer from './Halaman/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Menu /> {/* Tambahkan Menu Component */}
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
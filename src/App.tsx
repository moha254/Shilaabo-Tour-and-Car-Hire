import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { About as HomeAbout } from './components/home/About';
import { Testimonials } from './components/home/Testimonials';
import { Cars } from './pages/Cars';
import { Tours } from './pages/Tours';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  React.useEffect(() => {
    const path = window.location.pathname;
    const page = path === '/' ? 'home' : path.slice(1);
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <HomeAbout />
            <Testimonials />
          </>
        );
      case 'cars':
        return <Cars />;
      case 'tours':
        return <Tours />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <HomeAbout />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
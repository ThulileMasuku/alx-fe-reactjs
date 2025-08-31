import React from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  return (
    <div>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;

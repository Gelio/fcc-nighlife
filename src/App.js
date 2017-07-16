import React from 'react';

// UI
import Header from './ui/Header';
import Footer from './ui/Footer';

// Authentication
import AuthBar from './authentication/AuthBar';

// Bar list
import BarList from './bar-list/BarList';

function App() {
  return (
    <div className="app">
      <Header />
      <AuthBar />
      <BarList />
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';

// UI
import Header from './ui/Header';
import Footer from './ui/Footer';

// Authentication
import AuthBar from './authentication/AuthBar';

// Search Box
import SearchBox from './search-box/SearchBox';

// Bar list
import BarList from './bar-list/BarList';

function App() {
  return (
    <div className="app">
      <Header />
      <AuthBar />
      <SearchBox />
      <BarList />
      <Footer />
    </div>
  );
}

export default App;

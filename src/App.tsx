import React from 'react';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Navigation />

      </main>
    </div>
  );
};

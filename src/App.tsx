import React from 'react';
import { Catalog } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
    </div>
  );
};

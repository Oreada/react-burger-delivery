import React from 'react';
import { Catalog } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';
import { ModalDelivery } from './components/ModalDelivery/ModalDelivery';
import { Navigation } from './components/Navigation/Navigation';
import { useAppSelector } from './store/hook';

export const App = () => {
  const { isDeliveryOpen } = useAppSelector((state) => state.modalDelivery); //! так достаём данные из redux store

  return (
    <div>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      {isDeliveryOpen && <ModalDelivery />}
    </div>
  );
};

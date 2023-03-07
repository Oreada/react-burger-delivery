import React from 'react';
import { Catalog } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';
import { ModalDelivery } from './components/ModalDelivery/ModalDelivery';
import { ModalDetail } from './components/ModalDetail/ModalDetail';
import { Navigation } from './components/Navigation/Navigation';
import { useAppSelector } from './store/hook';

export const App = () => {
  const { isDeliveryOpen } = useAppSelector((state) => state.modalDelivery); //! так достаём данные из redux store
  const { isDetailOpen } = useAppSelector((state) => state.modalDetail);
  const { productDetail } = useAppSelector((state) => state.modalDetail);

  return (
    <div>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      {isDeliveryOpen && <ModalDelivery />}
      {isDetailOpen && <ModalDetail productDetail={productDetail} />}
    </div>
  );
};

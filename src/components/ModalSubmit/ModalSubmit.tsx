import { useAppDispatch, useAppSelector } from '../../store/hook';
import { closeModalSubmit } from '../../store/modalDeliverySlice';
import { CloseModalButton } from '../CloseModalButton/CloseModalButton';
import style from './ModalSubmit.module.css';

export const ModalSubmit = () => {
  const { orderId } = useAppSelector((state) => state.modalDelivery);

  const dispatch = useAppDispatch();

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget ||
      ((event.target as HTMLElement).parentElement as HTMLElement).id === 'closeSubmit') {
      dispatch(closeModalSubmit());
    };
  };

  return (
    <div className={style.modal} onClick={handleCloseModal}>
      <div className={style.msubmit}>
        <div className={style.container}>
          <div className={style.modal__info}>
            <h2 className={style.modal__title}>Ваш заказ принят!</h2>
            <p className={style.modal__number}>Номер заказа: {orderId}.</p>
            <p className={style.modal__note}>Скоро Вам позвонит наш оператор.</p>

          </div>
          <button
            className={style.product__add}
            type="button"
            onClick={handleCloseModal}>
            Закрыть
          </button>
        </div>

        <CloseModalButton close={handleCloseModal} idName={'closeSubmit'} />
      </div>
    </div>
  );
};

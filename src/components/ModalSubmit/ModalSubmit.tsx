import { useAppDispatch, useAppSelector } from '../../store/hook';
import { closeModalSubmit } from '../../store/modalSubmitSlice';
import style from './ModalSubmit.module.css';

export const ModalSubmit = () => {
  const { orderId } = useAppSelector((state) => state.modalSubmit);

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

        <button className={style.modal__close} type='button' id='closeSubmit' onClick={handleCloseModal}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='5.07422'
              y='5.28247'
              width='1'
              height='20'
              transform='rotate(-45 5.07422 5.28247)'
            />
            <rect
              x='5.78125'
              y='19.4246'
              width='1'
              height='20'
              transform='rotate(-135 5.78125 19.4246)'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

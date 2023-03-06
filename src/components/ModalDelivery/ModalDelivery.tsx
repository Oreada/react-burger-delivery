import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hook';
import { closeModal } from '../../store/modalDeliverySlice';
import style from './ModalDelivery.module.css';

export const ModalDelivery = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget ||
      ((event.target as HTMLElement).parentElement as HTMLElement).id === 'modal__close') {
      dispatch(closeModal());
    };
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    format: '',
    address: '',
    floor: '',
    intercom: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev => {
      return {
        ...prev,
        [name]: value,
      };
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formData', formData);
  };

  return (
    <div className={style.modal} onClick={handleCloseModal}>
      <div className={style.mdelivery}>
        <div className={style.container}>
          <h2 className={style.title}>Доставка</h2>

          <form className={style.form} id='delivery' onSubmit={handleSubmit}>
            <fieldset className={style.fieldset}>
              <input
                className={style.input}
                type='text'
                name='name'
                placeholder='Ваше имя'
                onChange={handleChange}
              />
              <input
                className={style.input}
                type='tel'
                name='phone'
                placeholder='Телефон'
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className={style.fieldset_radio}>
              <label className={style.label}>
                <input
                  className={style.radio}
                  type='radio'
                  name='format'
                  value='pickup'
                  checked={formData.format === 'pickup'}
                  onChange={handleChange}
                />
                <span>Самовывоз</span>
              </label>

              <label className={style.label}>
                <input
                  className={style.radio}
                  type='radio'
                  name='format'
                  value='delivery'
                  checked={formData.format === 'delivery'}
                  onChange={handleChange}
                />
                <span>Доставка</span>
              </label>
            </fieldset>

            <fieldset className={style.fieldset}>
              <input
                className={style.input}
                type='text'
                name='address'
                placeholder='Улица, дом, квартира'
                onChange={handleChange}
              />
              <input
                className={classNames(style.input, style.input_half)}
                type='number'
                name='floor'
                placeholder='Этаж'
                onChange={handleChange}
              />
              <input
                className={classNames(style.input, style.input_half)}
                type='number'
                name='intercom'
                placeholder='Домофон'
                onChange={handleChange}
              />
            </fieldset>
          </form>

          <button
            className={style.submit}
            type='submit'
            form='delivery'
          >
            Оформить
          </button>
        </div>

        <button className={style.modal__close} type='button' id='modal__close' onClick={handleCloseModal}>
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
  )
};

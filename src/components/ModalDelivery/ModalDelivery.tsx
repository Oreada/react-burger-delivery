import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { closeModalDelivery, submitOrder } from '../../store/modalDeliverySlice';
import { Loader } from '../Loader/Loader';
import { rootPortal } from '../../index';
import { createPortal } from 'react-dom';
import style from './ModalDelivery.module.css';
import { CloseModalButton } from '../CloseModalButton/CloseModalButton';

export type FormData = {
  name: string,
  phone: string,
  format: string,
  address: string,
  floor: string,
  intercom: string,
};

export const ModalDelivery = () => {
  const { orderList } = useAppSelector((state) => state.order);
  const isLoading = useAppSelector((state) => state.modalDelivery.loader);

  const dispatch = useAppDispatch();

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget ||
      ((event.target as HTMLElement).parentElement as HTMLElement).id === 'closeDelivery') {
      dispatch(closeModalDelivery());
    };
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    format: 'delivery',
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitOrder({ ...formData, orderList: orderList }));
  };

  return (
    <>
      {isLoading && createPortal(<Loader />, rootPortal)}
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
                  value={formData.name}
                  placeholder='Ваше имя'
                  onChange={handleChange}
                />
                <input
                  className={style.input}
                  type='tel'
                  name='phone'
                  value={formData.phone}
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

              {
                formData.format === 'delivery' && (
                  <fieldset className={style.fieldset}>
                    <input
                      className={style.input}
                      type='text'
                      name='address'
                      value={formData.address}
                      placeholder='Улица, дом, квартира'
                      onChange={handleChange}
                    />
                    <input
                      className={classNames(style.input, style.input_half)}
                      type='number'
                      name='floor'
                      value={formData.floor}
                      placeholder='Этаж'
                      onChange={handleChange}
                    />
                    <input
                      className={classNames(style.input, style.input_half)}
                      type='number'
                      name='intercom'
                      value={formData.intercom}
                      placeholder='Домофон'
                      onChange={handleChange}
                    />
                  </fieldset>
                )
              }
            </form>

            <button
              className={style.submit}
              type='submit'
              form='delivery'
            >
              Оформить
            </button>
          </div>

          <CloseModalButton close={handleCloseModal} idName={'closeDelivery'} />
        </div>
      </div>
    </>
  )
};

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { openModalDelivery } from '../../store/modalDeliverySlice';
import { getOrderList } from '../../store/orderSlice';
import { OrderItem } from '../OrderItem/OrderItem';
import style from './Order.module.css';

export const Order = () => {
	const { totalPrice, totalCount, orderList, orderGoods } = useAppSelector((state) => state.order); //! так достаём данные из redux store

	const dispatch = useAppDispatch();

	const [isOrderShown, setIsOrderShown] = useState(false); //! для показа/скрытия корзины на малых экранах

	useEffect(() => {
		dispatch(getOrderList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderList.length]); //! делаем новый запрос на сервер, если добавили НОВЫЙ товар или убрали какой-то совсем
	//! не делаем новый запрос на сервер, если меняется количество товаров, которые уже есть в списке

	const handleClick = () => {
		dispatch(openModalDelivery());
	};

	const handleBasketClick = () => {
		setIsOrderShown(prev => !prev);
	};

	const handleHideBasketClick = () => {
		setIsOrderShown(false);
	};

	return (
		<div className={isOrderShown ?
			classNames(style.catalog__order, style.order, style.order_open) :
			classNames(style.catalog__order, style.order)}>
			<section className={style.order__wrapper}>
				<div className={style.order__header} tabIndex={0} role="button">
					<h2 className={style.order__title} onClick={handleBasketClick}>Корзина</h2>

					<span className={style.order__count}>{totalCount}</span>
				</div>

				<div className={style.order__wrap_list}>
					<ul className={style.order__list}>

						{orderGoods.map((item) => (
							<OrderItem key={item.id} good={item} />
						))}

					</ul>

					<div className={style.order__total}>
						<p>Итого</p>
						<p>
							<span className={style.order__amount}>{totalPrice}</span>
							<span className={style.currency}>&nbsp;MDL</span>
						</p>
					</div>

					<button
						className={style.order__submit}
						disabled={orderGoods.length === 0}
						onClick={handleClick}
					>
						Оформить заказ
					</button>

					<div className={style.order__apeal}>
						<p className={style.order__text}>Бесплатная доставка от 200 MDL</p>
						<button className={style.order__close} onClick={handleHideBasketClick}>Свернуть</button>
					</div>
				</div>
			</section>
		</div>
	)
};

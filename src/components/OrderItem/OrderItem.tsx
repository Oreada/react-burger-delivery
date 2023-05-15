import { API_URL } from '../../constants';
import { ProductWithCount } from '../../store/orderSlice';
import { Count } from '../Count/Count';
import style from './OrderItem.module.css';

export type OrderItemProps = {
	good: ProductWithCount;
};

export const OrderItem = ({ good }: OrderItemProps) => {
	return (
		<li className={style.order__item}>
			<img className={style.order__image} src={`${API_URL}/${good.image}`} alt={good.title} />

			<div className={style.goods}>
				<h3 className={style.goods__title}>{good.title}</h3>

				<p className={style.goods__weight}>{good.weight}&nbsp;г</p>

				<p className={style.goods__price}>{good.price}
					<span className={style.currency}>&nbsp;MDL</span>
				</p>
			</div>

			<Count count={good.count} id={good.id} />
		</li>
	)
};

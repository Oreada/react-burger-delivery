import { API_URL } from '../../constants';
import { useAppDispatch } from '../../store/hook';
import { addProduct } from '../../store/orderSlice';
import { ProductType } from '../../store/productSlice';
import style from './Product.module.css';

export type ProductProps = {
	product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
	// const orderList = useAppSelector((state) => state.order.orderList); //! так достаём данные из redux store

	const dispatch = useAppDispatch();

	const handleClick = (idObj: { id: string }) => {
		dispatch(addProduct(idObj));
		// console.log(orderList); //! выводит с отставанием на одно действие
	};

	return (
		<article className={style.product}>
			<img src={`${API_URL}/${product.image}`} alt={product.title} className={style.product__image} />

			<p className={style.product__price}>{product.price}<span className={style.currency}>&nbsp;₽</span></p>

			<h3 className={style.product__title}>
				<button className={style.product__detail}>{product.title}</button>
			</h3>

			<p className={style.product__weight}>{product.weight}г</p>

			<button
				className={style.product__add}
				type="button"
				onClick={() => handleClick({ id: product.id })}>
				Добавить
			</button>
		</article>
	)
};

import { API_URL } from '../../constants';
import { ProductType } from '../../store/productSlice';
import style from './Product.module.css';

export type ProductProps = {
	product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
	return (
		<article className={style.product}>
			<img src={`${API_URL}/${product.image}`} alt={product.title} className={style.product__image} />

			<p className={style.product__price}>{product.price}<span className={style.currency}>₽</span></p>

			<h3 className={style.product__title}>
				<button className={style.product__detail}>{product.title}</button>
			</h3>

			<p className={style.product__weight}>{product.weight}г</p>

			<button className={style.product__add} type="button">Добавить</button>
		</article>
	)
};

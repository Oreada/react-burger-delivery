import { API_URL } from '../../constants';
import { useAppDispatch } from '../../store/hook';
import { changeProductDetail, openModalDetail } from '../../store/modalDetailSlice';
import { addProduct } from '../../store/orderSlice';
import { ProductType } from '../../store/productSlice';
import style from './Product.module.css';

export type ProductProps = {
	product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
	const dispatch = useAppDispatch();

	const handleClickAdd = (idObj: { id: string }) => {
		dispatch(addProduct(idObj));
	};

	const handleClickDetail = (product: ProductType) => {
		dispatch(changeProductDetail(product));
		dispatch(openModalDetail());
	};

	return (
		<article className={style.product}>
			<img
				src={`${API_URL}/${product.image}`}
				alt={product.title}
				className={style.product__image}
				onClick={() => handleClickDetail(product)}
			/>

			<p className={style.product__price}>{product.price}<span className={style.currency}>&nbsp;₽</span></p>

			<h3 className={style.product__title}>
				<button
					className={style.product__detail}
					onClick={() => handleClickDetail(product)}
				>
					{product.title}
				</button>
			</h3>

			<p className={style.product__weight}>{product.weight}г</p>

			<button
				className={style.product__add}
				type="button"
				onClick={() => handleClickAdd({ id: product.id })}>
				Добавить
			</button>
		</article>
	)
};

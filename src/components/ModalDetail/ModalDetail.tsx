import { API_URL } from '../../constants';
import { useAppDispatch } from '../../store/hook';
import { closeModalDetail } from '../../store/modalDetailSlice';
import { addProduct } from '../../store/orderSlice';
import { ProductType } from '../../store/productSlice';
import style from './ModalDetail.module.css';

export type ModalDetailProps = {
	productDetail: ProductType;
};

export const ModalDetail = ({ productDetail }: ModalDetailProps) => {
	const dispatch = useAppDispatch();

	const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
		if (event.target === event.currentTarget ||
			((event.target as HTMLElement).parentElement as HTMLElement).id === 'closeDetail') {
			dispatch(closeModalDetail());
		};
	};

	const handleClickAdd = (idObj: { id: string }) => {
		dispatch(addProduct(idObj));
	};

	return (
		<div className={style.modal} onClick={handleCloseModal}>
			<div className={style.mdetail}>
				<div className={style.container}>
					<img src={`${API_URL}/${productDetail.image}`} alt={productDetail.title} className={style.modal__image} />
					<div className={style.modal__info}>
						<h2 className={style.modal__title}>{productDetail.title}</h2>
						<p className={style.modal__description}>{productDetail.description}</p>
						<p className={style.modal__ingredients}>Ингредиенты:&nbsp;{productDetail.ingredients.join(', ')}</p>
						<p className={style.modal__weight}>Вес:&nbsp;{productDetail.weight}&nbsp;г</p>
						<p className={style.modal__price}>Цена:&nbsp;{productDetail.price}&nbsp;₽</p>
					</div>
					<button
						className={style.product__add}
						type="button"
						onClick={() => handleClickAdd({ id: productDetail.id })}>
						Добавить
					</button>
				</div>

				<button className={style.modal__close} type='button' id='closeDetail' onClick={handleCloseModal}>
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

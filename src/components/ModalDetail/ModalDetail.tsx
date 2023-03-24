import { API_URL } from '../../constants';
import { useAppDispatch } from '../../store/hook';
import { closeModalDetail } from '../../store/modalDetailSlice';
import { addProduct } from '../../store/orderSlice';
import { ProductType } from '../../store/productSlice';
import { CloseModalButton } from '../CloseModalButton/CloseModalButton';
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

				<CloseModalButton close={handleCloseModal} idName={'closeDetail'} />
			</div>
		</div>
	);
};

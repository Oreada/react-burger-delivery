import { useAppDispatch } from '../../store/hook';
import { addProduct, subtractProduct } from '../../store/orderSlice';
import style from './Count.module.css';

export type CountProps = {
	count: number;
	id: string;
};

export const Count = ({ count, id }: CountProps) => {
	const dispatch = useAppDispatch();

	const increaseNumber = () => {
		dispatch(addProduct({ id: id }));
	};

	const decreaseNumber = () => {
		dispatch(subtractProduct({ id: id }));
	};

	return (
		<div className={style.count}>
			<button className={style.count__minus} onClick={decreaseNumber}	>-</button>
			<p className={style.count__amount}>{count}</p>
			<button className={style.count__plus} onClick={increaseNumber}>+</button>
		</div>
	)
};

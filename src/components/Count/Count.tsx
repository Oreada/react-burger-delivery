import style from './Count.module.css';

export type CountProps = {
	count: number;
	id: string;
};

export const Count = ({ count, id }: CountProps) => {

	const increaseNumber = () => {
	};

	const decreaseNumber = () => {
		// if (count > 1) {
		// };
	};

	return (
		<div className={style.count}>
			<button className={style.count__minus} onClick={decreaseNumber} disabled={count === 1}>-</button>
			<p className={style.count__amount}>{count}</p>
			<button className={style.count__plus} onClick={increaseNumber}>+</button>
		</div>
	)
};

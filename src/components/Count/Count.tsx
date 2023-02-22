import style from './Count.module.css';

export type CountProps = {
	count: number;
};

export const Count = ({ count }: CountProps) => {

	return (
		<div className={style.count}>
			<button className={style.count__minus}>-</button>
			<p className={style.count__amount}>{count}</p>
			<button className={style.count__plus}>+</button>
		</div>
	)
};

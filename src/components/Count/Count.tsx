import { useState } from 'react';
import style from './Count.module.css';

// export type CountProps = {
// 	count: number;
// };

export const Count = () => {
	const [count, setCount] = useState(1);

	const increaseNumber = () => {
		setCount(prev => prev + 1);
	};

	const decreaseNumber = () => {
		if (count > 1) {
			setCount(prev => prev - 1);
		};
	};

	return (
		<div className={style.count}>
			<button className={style.count__minus} onClick={decreaseNumber} disabled={count === 1}>-</button>
			<p className={style.count__amount}>{count}</p>
			<button className={style.count__plus} onClick={increaseNumber}>+</button>
		</div>
	)
};

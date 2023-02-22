import classNames from "classnames";
import { Order } from "../Order/Order";
import { Product } from "../Product/Product";
import style from './Catalog.module.css';

const goodsList = [
	{ title: 'Мясная бомба' },
	{ title: 'Супер сырный' },
	{ title: 'Сытный' },
	{ title: 'Итальянский' },
	{ title: 'Вечная классика' },
	{ title: 'Тяжёлый удар' },
];

export const Catalog = () => {
	return (
		<section className={style.catalog}>
			<div className={classNames(style.container, style.catalog__container)}>
				<Order />

				<div className={style.catalog__wrapper}>
					<h2 className={style.catalog__title}>Бургеры</h2>

					<div className={style.catalog__wrap_list}>
						<ul className={style.catalog__list}>

							{goodsList.map((item, index) => (
								<li key={index} className={style.catalog__item}>
									<Product title={item.title} />
								</li>
							))}

						</ul>
					</div>
				</div>
			</div>
		</section>
	)
};

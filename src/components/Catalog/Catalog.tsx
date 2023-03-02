import classNames from "classnames";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getProductsList } from "../../store/productSlice";
import { Order } from "../Order/Order";
import { Product } from "../Product/Product";
import style from './Catalog.module.css';

// const goodsList = [
// 	{ title: 'Мясная бомба' },
// 	{ title: 'Супер сырный' },
// 	{ title: 'Сытный' },
// 	{ title: 'Итальянский' },
// 	{ title: 'Вечная классика' },
// 	{ title: 'Тяжёлый удар' },
// ];

export const Catalog = () => {
	const products = useAppSelector((state) => state.product.productsList); //! так достаём данные из redux store
	const categoriesList = useAppSelector((state) => state.category.category);
	const activeIndex = useAppSelector((state) => state.category.activeCategory);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoriesList.length) {
			const activeCategory = categoriesList[activeIndex].title;
			dispatch(getProductsList(activeCategory));
		};
	}, [categoriesList, activeIndex, dispatch]);

	return (
		<section className={style.catalog}>
			<div className={classNames(style.container, style.catalog__container)}>
				<Order />

				<div className={style.catalog__wrapper}>
					<h2 className={style.catalog__title}>
						{categoriesList.length && categoriesList[activeIndex].rus}
					</h2>

					<div className={style.catalog__wrap_list}>

						{products.length ? (
							<ul className={style.catalog__list}>

								{products.map((item) => (
									<li key={item.id} className={style.catalog__item}>
										<Product product={item} />
									</li>
								))}

							</ul>
						) : (<p className={style.catalog__empty}>На данный момент в этой категории нет товаров</p>)}

					</div>
				</div>
			</div>
		</section>
	)
};

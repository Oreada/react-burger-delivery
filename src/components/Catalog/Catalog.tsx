import classNames from "classnames";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getProductsList } from "../../store/productSlice";
import { Order } from "../Order/Order";
import { Product } from "../Product/Product";
import style from './Catalog.module.css';

export const Catalog = () => {
	const products = useAppSelector((state) => state.product.productsList); //! так достаём данные из redux store
	const categoriesList = useAppSelector((state) => state.category.category);
	const activeIndex = useAppSelector((state) => state.category.activeCategory);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoriesList.length > 0) {
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
						{(categoriesList.length > 0) && categoriesList[activeIndex].rus}
					</h2>

					<div className={style.catalog__wrap_list}>

						{(products.length > 0) ? (
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

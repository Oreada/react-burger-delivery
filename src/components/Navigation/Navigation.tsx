import classNames from 'classnames';
import { useEffect } from 'react';
import { getCategoriesList, changeCategory } from '../../store/categorySlice';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import style from './Navigation.module.css';

export const Navigation = () => {
	const categoriesList = useAppSelector((state) => state.category.category); //! так достаём данные из redux store
	const activeIndex = useAppSelector((state) => state.category.activeCategory);
	// console.log(categoriesList);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (index: number) => {
		dispatch(changeCategory(index));
	};

	return (
		<nav className={style.navigation}>
			<div className={classNames(style.navigation__container, style.container)}>
				<ul className={style.navigation__list}>

					{
						//* TODO: после деплоя бэка заменить backgroundImage на `url(${API_URI}/${item.image}`)
						(() => {
							if (Array.isArray(categoriesList)) {
								return (
									categoriesList.map((item, index) => (
										<li key={item.title} className={style.navigation__item}>
											<button className={classNames(style.navigation__button,
												activeIndex === index ? style.navigation__button_active : '')}
												style={{ backgroundImage: `url(${item.image})` }}
												onClick={() => handleClick(index)}
											>
												{item.rus}
											</button>
										</li>
									))
								)
							}
						})()
					}

					{/* {categoriesList.map((item, index) => (
						<li key={index} className={style.navigation__item}>
							<button className={classNames(style.navigation__button,
								activeIndex === index ? style.navigation__button_active : '')}
								style={{ backgroundImage: `url(${item.image})` }}
								onClick={() => handleClick(index)}
							>
								{item.rus}
							</button>
						</li>
					))} */}

				</ul>
			</div>
		</nav>
	)
};

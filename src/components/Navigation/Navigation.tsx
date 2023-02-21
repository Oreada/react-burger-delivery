import style from './Navigation.module.css';

export const Navigation = () => {
	return (
		<nav className="navigation">
			<div className="container navigation__container">
				<ul className="navigation__list">
					<li className="navigation__item">
						<button className="navigation__button navigation__button_burger navigation__button_active">Бургеры</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_snack">Закуски</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_hotdog">Хот-доги</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_combo">Комбо</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_shawarma">Шаурма</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_pizza">Пицца</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_wok">Вок</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_dessert">Десерты</button>
					</li>
					<li className="navigation__item">
						<button className="navigation__button navigation__button_sauce">Соусы</button>
					</li>
				</ul>
			</div>
		</nav>
	)
};

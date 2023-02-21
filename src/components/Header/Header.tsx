import style from './Header.module.css';
import logo from '../../img/logo.svg';

export const Header = () => {
	return (
		<header className="header">
			<div className="container header__container">
				<img className="header__logo" src={logo} alt="Логотип YourMeal" />

				<div className="header__wrapper">
					<h1 className="header__title">
						<span>Только самые</span>
						<span className="header__red">сочные бургеры!</span>
					</h1>

					<p className="header__appeal">Бесплатная доставка от 599₽</p>
				</div>
			</div>
		</header>
	)
};

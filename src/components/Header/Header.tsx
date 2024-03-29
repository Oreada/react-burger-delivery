import style from './Header.module.css';
import logo from '../../img/logo.svg';
import classNames from 'classnames';

export const Header = () => {
	return (
		<header className={style.header}>
			<div className={classNames(style.header__container, style.container)}>
				<img className={style.header__logo} src={logo} alt="Логотип YourMeal" />
				<div className={style.header__wrapper}>
					<h1 className={style.header__title}>
						<span>Только самые</span>
						<span className={style.header__red}>сочные бургеры!</span>
					</h1>
					<p className={style.header__appeal}>Бесплатная доставка от 200 лей</p>
				</div>
			</div>
		</header >
	)
};

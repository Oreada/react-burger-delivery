import style from './Container.module.css';
import { FC, ReactNode } from 'react';

export type ContainerProps = {
	children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<div className={style.container}>
			{children}
		</div>
	)
};

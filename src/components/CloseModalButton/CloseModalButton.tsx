import style from './CloseModalButton.module.css';

export type CloseModalButtonProps = {
	close: (event: React.MouseEvent<HTMLElement>) => void;
	idName: string;
};

export const CloseModalButton = ({ close, idName }: CloseModalButtonProps) => {
	return (
		<button className={style.modal__close} type='button' id={idName} onClick={close}>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect
					x='5.07422'
					y='5.28247'
					width='1'
					height='20'
					transform='rotate(-45 5.07422 5.28247)'
				/>
				<rect
					x='5.78125'
					y='19.4246'
					width='1'
					height='20'
					transform='rotate(-135 5.78125 19.4246)'
				/>
			</svg>
		</button>
	)
};

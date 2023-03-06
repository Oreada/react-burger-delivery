import { clearOrder, ProductForOrder } from '../store/orderSlice';
import { closeModal } from '../store/modalDeliverySlice';
import { useAppDispatch } from '../store/hook';
import { FormData } from '../components/ModalDelivery/ModalDelivery';

export const useSubmitOrder = () => {
	const dispatch = useAppDispatch();

	const submitOrder = async (data: FormData & { orderList: Array<ProductForOrder> }) => {
		try {
			const response = await fetch(
				'https://cloudy-slash-rubidium.glitch.me/api/order',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

			if (!response.ok) {
				throw new Error(`Request failed with status code ${response.status}`);
			};

			dispatch(closeModal());
			dispatch(clearOrder());

			return await response.json();
		} catch (e: unknown) {
			const err = e as Error;
			console.log(err.message);
			throw new Error(`Error: ${err.message}`);
		};
	};

	return submitOrder;
};

import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from './productSlice';

type ProductWithCount = ProductType & { count: number };

export type OrderState = {
	orderList: Array<ProductWithCount>;
	error: string;
};

type Payload = ProductType;

const initialState: OrderState = {
	orderList: JSON.parse(localStorage.getItem('orderList') || '[]'),
	error: '',
};

//! Middleware - тут для работы с localStorage (можно было и просто через useEffect, но это был бы вынос логики из Редакса)
//! говорят, его часто используют для работы с токенами
export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
	const nextAction = next(action);
	console.log(nextAction);

	if (nextAction.type.startsWith('order/')) {
		const orderList = store.getState().order.orderList;
		console.log('orderList from STORE', orderList);
		localStorage.setItem('orderList', JSON.stringify(orderList)); //! сохраняем заказ в localStorage
	};

	return nextAction;
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		addProduct(state, action: PayloadAction<Payload>) {
			const choosenProduct = state.orderList.find((item) => item.id === action.payload.id);

			if (choosenProduct) {
				choosenProduct.count += 1; //! увеличиваю счётчик, если такой товар уже есть в orderList
			} else {
				state.orderList.push({ ...action.payload, count: 1 }); //! добавляю товар ProductType плюс счётчик
			};
		},
	},
});

export const { addProduct } = orderSlice.actions;

export default orderSlice.reducer; //! в файле index.ts импортировала его как orderReducer

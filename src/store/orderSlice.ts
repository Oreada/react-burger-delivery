import { AsyncThunk, createAsyncThunk, createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { API_URL, POSTFIX_PRODUCT } from '../constants';
import { ProductsList, ProductType } from './productSlice';

export type ProductWithCount = ProductType & { count: number };

export type ProductForOrder = {
	id: string;
	count: number;
};

export type OrderState = {
	orderList: Array<ProductForOrder>;
	orderGoods: Array<ProductWithCount>;
	totalPrice: number,
	totalCount: number,
	error: string;
};

type Payload = { id: string; };

const initialState: OrderState = {
	orderList: JSON.parse(localStorage.getItem('orderList') || '[]'),
	orderGoods: [],
	totalPrice: 0,
	totalCount: 0,
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

//! <чтоВозвращает, чтоПринимает, допОпции>
export const getOrderList: AsyncThunk<ProductsList, undefined, { rejectValue: string }> = createAsyncThunk<
	ProductsList,
	undefined,
	{ rejectValue: string }>(
		'order/fetch',
		async (_, { rejectWithValue, getState }) => {
			const listIds = (getState() as RootState).order.orderList.map((item) => item.id);
			console.log('tets listIds', listIds);

			try {
				const res = await fetch(`${API_URL}${POSTFIX_PRODUCT}?list=${listIds}`);
				return await res.json();
			} catch (e) {
				const err = e as Error;
				return rejectWithValue(err.message);
			}
		}
	);

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		addProduct(state, action: PayloadAction<Payload>) {
			const choosenProduct = state.orderList.find((item) => item.id === action.payload.id); //! сохраняется в localStorage через мой localStorageMiddleware

			if (choosenProduct) {
				choosenProduct.count += 1; //! увеличиваю счётчик, если такой товар уже есть в orderList

				const orderGood = state.orderGoods.find((item) => item.id === action.payload.id);
				if (orderGood) {
					orderGood.count = choosenProduct.count; //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с addProduct
				};

				state.totalCount = state.orderGoods.reduce((acc, cur) => acc + cur.count, 0); //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с addProduct
				state.totalPrice = state.orderGoods.reduce((acc, cur) => acc + cur.count * cur.price, 0); //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с addProduct

			} else {
				state.orderList.push({ ...action.payload, count: 1 }); //! добавляю id товара плюс счётчик
			};
		},
		subtractProduct(state, action: PayloadAction<Payload>) {
			const choosenProduct = state.orderList.find((item) => item.id === action.payload.id); //! сохраняется в localStorage через мой localStorageMiddleware

			if ((choosenProduct as ProductForOrder).count > 1) {
				(choosenProduct as ProductForOrder).count -= 1; //! уменьшаю счётчик, если таких товаров больше одного

				const orderGood = state.orderGoods.find((item) => item.id === action.payload.id);
				if (orderGood) {
					orderGood.count = (choosenProduct as ProductForOrder).count; //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с subtractProduct
				};

				state.totalCount = state.orderGoods.reduce((acc, cur) => acc + cur.count, 0); //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с subtractProduct
				state.totalPrice = state.orderGoods.reduce((acc, cur) => acc + cur.count * cur.price, 0); //! АКТУАЛИЗИРУЮ данные в orderGoods в связи с subtractProduct

			} else {
				state.orderList = state.orderList.filter((item) => item.id !== action.payload.id); //! сохраняем товары КРОМЕ того, который удалили (count был 1)
			};
		},
		clearOrder(state) {
			state.orderList = [];
			state.orderGoods = [];
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				getOrderList.pending, (state) => {
					state.error = '';
				})
			.addCase(
				getOrderList.fulfilled, (state, action) => {
					const productWithCountList = state.orderList.map((item) => {
						const product = action.payload.find((pr) => pr.id === item.id); //! находим каждый полученный товар среди orderList

						const productWithCount = product ? { ...product, count: item.count } :
							{
								calories: 0,
								category: '',
								description: '',
								id: '',
								image: '',
								ingredients: [],
								price: 0,
								title: '',
								weight: 0,
								count: 0,
							};

						return productWithCount; //! теперь это не просто товары, а в каждом есть ещё и count
					});

					state.error = '';
					state.orderGoods = productWithCountList as Array<ProductWithCount>;
					state.totalCount = productWithCountList.reduce((acc, cur) => acc + cur.count, 0);
					state.totalPrice = productWithCountList.reduce((acc, cur) => acc + cur.count * cur.price, 0);
				})
			.addCase(
				getOrderList.rejected, (state, action) => {
					state.orderGoods = [];
					state.error = action.payload as string; //* TODO: сделать вывод ошибки для пользователя
					console.log(state.error);
				})
	},
});

export const { addProduct, subtractProduct, clearOrder } = orderSlice.actions;

export default orderSlice.reducer; //! в файле index.ts импортировала его как orderReducer

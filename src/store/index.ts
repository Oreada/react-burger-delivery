import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import orderReducer, { localStorageMiddleware } from './orderSlice';

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		order: orderReducer,
	},

	middleware(getDefaultMiddleware) {
		const mdws = getDefaultMiddleware().concat(localStorageMiddleware);
		// console.log(mdws);
		return mdws;
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

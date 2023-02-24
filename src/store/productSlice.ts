import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, POSTFIX_PRODUCT } from '../constants';

export type ProductType = {
	calories: number;
	category: string;
	description: string;
	id: string;
	image: string;
	ingredients: Array<string>;
	price: number;
	title: string;
	weight: number;
};

export type ProductsList = Array<ProductType>;

export type ProductState = {
	productsList: ProductsList;
	error: string;
};

const initialState: ProductState = {
	productsList: [],
	error: '',
};

//! <чтоВозвращает, чтоПринимает, допОпции>
export const getProductsList: AsyncThunk<ProductsList, string, { rejectValue: string }> = createAsyncThunk<
	ProductsList,
	string,
	{ rejectValue: string }>(
		'product/fetch',
		async (category, { rejectWithValue }) => {

			try {
				const res = await fetch(`${API_URL}${POSTFIX_PRODUCT}?category=${category}`);
				return await res.json();
			} catch (e) {
				const err = e as Error;
				return rejectWithValue(err.message);
			}
		}
	);

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(
				getProductsList.pending, (state) => {
					state.error = '';
				})
			.addCase(
				getProductsList.fulfilled, (state, action) => {
					state.error = '';
					state.productsList = action.payload;
				})
			.addCase(
				getProductsList.rejected, (state, action) => {
					state.productsList = [];
					state.error = action.payload as string; //* TODO: сделать вывод ошибки для пользователя
					console.log(state.error);
				})
	},
});

export default productSlice.reducer; //! в файле index.ts импортировала его как productReducer

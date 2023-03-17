import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_URL, POSTFIX_PRODUCT } from '../constants';

export type Category = {
	title: string;
	rus: string;
	image: string;
};

export type CategoriesList = Array<Category>;

export type CategoryState = {
	category: CategoriesList;
	error: string;
	activeCategory: number;
};

type Payload = number;

const initialState: CategoryState = {
	category: [],
	error: '',
	activeCategory: 0,
};

//! <чтоВозвращает, чтоПринимает, допОпции>
export const getCategoriesList: AsyncThunk<CategoriesList, undefined, { rejectValue: string }> = createAsyncThunk<
	CategoriesList,
	undefined,
	{ rejectValue: string }>(
		'category/fetch',
		async (_, { rejectWithValue }) => {

			try {
				const res = await fetch(`${API_URL}${POSTFIX_PRODUCT}/category`);
				return await res.json();
			} catch (e) {
				const err = e as Error;
				return rejectWithValue(err.message);
			}
		}
	);

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		changeCategory(state, action: PayloadAction<Payload>) {
			state.activeCategory = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getCategoriesList.pending, (state) => {
				state.error = '';
			})
			.addCase(getCategoriesList.fulfilled, (state, action) => {
				state.error = '';
				state.category = action.payload;
			})
			.addCase(getCategoriesList.rejected, (state, action) => {
				state.category = [];
				state.error = action.payload as string;
				console.log(state.error);
			})
	},
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer; //! в файле index.ts импортировала его как categoryReducer

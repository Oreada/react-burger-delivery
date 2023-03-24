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
	activeCategory: number;
	loader: boolean;
	error: string;
};

type Payload = number;

const initialState: CategoryState = {
	category: [],
	activeCategory: 0,
	loader: false,
	error: '',
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
				state.loader = true;
				state.error = '';
			})
			.addCase(getCategoriesList.fulfilled, (state, action) => {
				state.category = action.payload;
				state.loader = false;
				state.error = '';
			})
			.addCase(getCategoriesList.rejected, (state, action) => {
				state.category = [];
				state.loader = false;
				state.error = action.payload as string;
				console.log(state.error);
			})
	},
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer; //! в файле index.ts импортировала его как categoryReducer

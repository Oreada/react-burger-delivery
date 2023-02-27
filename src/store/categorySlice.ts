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
	category: [
		// { title: 'burger', rus: 'Бургеры', image: '/img/burger.png' },
		// { title: 'snack', rus: 'Закуски', image: '/img/snack.png' },
		// { title: 'hot-dog', rus: 'Хот-доги', image: '/img/hot-dog.png' },
		// { title: 'combo', rus: 'Комбо', image: '/img/combo.png' },
		// { title: 'shawarma', rus: 'Шаурма', image: '/img/shawarma.png' },
		// { title: 'pizza', rus: 'Пицца', image: '/img/pizza.png' },
		// { title: 'wok', rus: 'Вок', image: '/img/wok.png' },
		// { title: 'dessert', rus: 'Десерты', image: '/img/dessert.png' },
		// { title: 'sauce', rus: 'Соусы', image: '/img/sauce.png' },
	],
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
				state.error = action.payload as string; //* TODO: сделать вывод ошибки для пользователя
				console.log(state.error);
			})
	},
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer; //! в файле index.ts импортировала его как categoryReducer

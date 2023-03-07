import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from './productSlice';

export type ModalDetailState = {
	isDetailOpen: boolean;
	productDetail: ProductType;
};

type Payload = ProductType;

const initialState: ModalDetailState = {
	isDetailOpen: false,
	productDetail: {
		calories: 0,
		category: '',
		description: '',
		id: '',
		image: '',
		ingredients: [],
		price: 0,
		title: '',
		weight: 0,
	},
};

const modalDetailSlice = createSlice({
	name: 'modalDetail',
	initialState: initialState,
	reducers: {
		openModalDetail(state) {
			state.isDetailOpen = true;
		},
		closeModalDetail(state) {
			state.isDetailOpen = false;
		},
		changeProductDetail(state, action: PayloadAction<Payload>) {
			state.productDetail = action.payload;
		},
	},
});

export const { openModalDetail, closeModalDetail, changeProductDetail } = modalDetailSlice.actions;

export default modalDetailSlice.reducer; //! в файле index.ts импортировала его как modalDetailReducer

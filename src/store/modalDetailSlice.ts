import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from './productSlice';

export type ModalDetailState = {
	isDetailOpen: boolean;
	productDetail: ProductType;
};

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
	},
});

export const { openModalDetail, closeModalDetail } = modalDetailSlice.actions;

export default modalDetailSlice.reducer; //! в файле index.ts импортировала его как modalDetailReducer

import { createSlice } from '@reduxjs/toolkit';

export type ModalDeliveryState = {
	isDeliveryOpen: boolean;
};

const initialState: ModalDeliveryState = {
	isDeliveryOpen: false,
};

const modalDeliverySlice = createSlice({
	name: 'modalDelivery',
	initialState: initialState,
	reducers: {
		openModalDelivery(state) {
			state.isDeliveryOpen = true;
		},
		closeModalDelivery(state) {
			state.isDeliveryOpen = false;
		},
	},
});

export const { openModalDelivery, closeModalDelivery } = modalDeliverySlice.actions;

export default modalDeliverySlice.reducer; //! в файле index.ts импортировала его как modalDeliveryReducer

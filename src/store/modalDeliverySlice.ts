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
		openModal(state) {
			state.isDeliveryOpen = true;
		},
		closeModal(state) {
			state.isDeliveryOpen = false;
		},
	},
});

export const { openModal, closeModal } = modalDeliverySlice.actions;

export default modalDeliverySlice.reducer; //! в файле index.ts импортировала его как modalDeliveryReducer

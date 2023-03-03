import { createSlice } from '@reduxjs/toolkit';

export type ModalDeliveryState = {
	isOpen: boolean;
};

const initialState: ModalDeliveryState = {
	isOpen: false,
};

const modalDeliverySlice = createSlice({
	name: 'modalDelivery',
	initialState: initialState,
	reducers: {
		openModal(state) {
			state.isOpen = true;
		},
		closeModal(state) {
			state.isOpen = false;
		},
	},
});

export const { openModal, closeModal } = modalDeliverySlice.actions;

export default modalDeliverySlice.reducer; //! в файле index.ts импортировала его как modalDeliveryReducer

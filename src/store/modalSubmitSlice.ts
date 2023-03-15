import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalSubmitState = {
	isSubmitOpen: boolean;
	orderId: string;
};

type Payload = string;

const initialState: ModalSubmitState = {
	isSubmitOpen: false,
	orderId: '',
};

const modalSubmitSlice = createSlice({
	name: 'modalSubmit',
	initialState: initialState,
	reducers: {
		openModalSubmit(state) {
			state.isSubmitOpen = true;
		},
		closeModalSubmit(state) {
			state.isSubmitOpen = false;
		},
		getOrderId(state, action: PayloadAction<Payload>) {
			state.orderId = action.payload;
		},
	},
});

export const { openModalSubmit, closeModalSubmit, getOrderId } = modalSubmitSlice.actions;

export default modalSubmitSlice.reducer; //! в файле index.ts импортировала его как modalSubmitReducer

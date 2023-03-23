import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FormData } from '../components/ModalDelivery/ModalDelivery';
import { ProductForOrder } from '../store/orderSlice';

export type ModalDeliveryState = {
	orderId: string;
	isDeliveryOpen: boolean;
	isSubmitOpen: boolean;
	loader: boolean;
	error: string;
};

export type SubmitResult = FormData & Array<ProductForOrder> & { id: string };

export type DataForSubmitting = FormData & { orderList: Array<ProductForOrder> };

const initialState: ModalDeliveryState = {
	orderId: '',
	isDeliveryOpen: false,
	isSubmitOpen: false,
	loader: false,
	error: '',
};

//! <чтоВозвращает, чтоПринимает, допОпции>
export const submitOrder: AsyncThunk<SubmitResult, DataForSubmitting, { rejectValue: string }> = createAsyncThunk<
	SubmitResult,
	DataForSubmitting,
	{ rejectValue: string }>(
		'submit/fetch',
		async (data, { rejectWithValue }) => {

			try {
				const res = await fetch(
					'https://cloudy-slash-rubidium.glitch.me/api/order',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					});

				return await res.json();
			} catch (e) {
				const err = e as Error;
				return rejectWithValue(err.message);
			}
		}
	);

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
		openModalSubmit(state) {
			state.isSubmitOpen = true;
		},
		closeModalSubmit(state) {
			state.isSubmitOpen = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				submitOrder.pending, (state) => {
					state.loader = true;
					state.error = '';
				})
			.addCase(
				submitOrder.fulfilled, (state, action) => {
					state.orderId = action.payload.id;
					state.loader = false;
					state.isDeliveryOpen = false;
					state.isSubmitOpen = true;
					state.error = '';
				})
			.addCase(
				submitOrder.rejected, (state, action) => {
					state.loader = false;
					state.isDeliveryOpen = false;
					state.isSubmitOpen = false;
					state.error = action.payload as string;
					console.log(state.error);
				})
	},
});

export const { openModalDelivery, closeModalDelivery, openModalSubmit, closeModalSubmit } = modalDeliverySlice.actions;

export default modalDeliverySlice.reducer; //! в файле index.ts импортировала его как modalDeliveryReducer

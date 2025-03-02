import { createSlice } from '@reduxjs/toolkit';
import { PENDING, INPROGRESS, REQUESTING, SUCCESS, ERROR } from '../../utilities/helpers';
import { remove } from 'src/utilities/async_storage';

const name = 'customer';

const initialState = {
  list: {
    status: PENDING,
    customers: [],
  },
  create: {
    status: PENDING,
  },
  edit: {
    status: PENDING,
  },
  remove: {
    status: PENDING,
  },
  form: {
    fields: {
      firstName: null,
      lastName: null,
      active: null,
      region: null,
    },
  },
  error: {
    message: '',
  },
};

const reducers = {
  createCustomer: (state) => {
    state.create.status = REQUESTING;
  },
  createCustomerResult: (state, { payload }) => {
    state.create.status = SUCCESS;
    state.list.customers = payload;
    state.form.fields = initialState.form.fields;
    state.create = initialState.create;
  },
  createCustomerError: (state, { payload }) => {
    state.create.status = ERROR;
    state.error.message = payload;
    state.form.fields = initialState.form.fields;
  },
  editCustomer: (state, { payload }) => {
    state.edit.status = REQUESTING;
  },
  setForm: (state, { payload }) => {
    const customer = state.list.customers.find((c) => (c.id = payload));

    if (customer) {
      state.form.fields = customer;
    } else {
      state.error.message = `could not find customer with id: ${payload}`;
    }
  },
  editCustomerResult: (state, { payload }) => {
    state.edit.status = SUCCESS;
    state.list.customers = payload;
    state.form.fields = initialState.form.fields;
    state.edit = initialState.edit;
  },
  editCustomerError: (state, { payload }) => {
    state.edit.status = ERROR;
    state.error.message = payload;
    state.form.fields = initialState.form.fields;
  },
  editCustomerStatus: (state, { payload }) => {
    state.edit = payload;
  },
  setFormField: (state, { payload }) => {
    const current = state.form.fields;
    const { field, value } = payload;

    const fields = {
      ...current,
      [field]: value,
    };

    state.form.fields = fields;
  },
  removeCustomer: (state, { payload }) => {
    state.remove.status = REQUESTING;
  },
  removeCustomerResult: (state, { payload }) => {
    state.remove.status = SUCCESS;
    state.list.customers = payload;
  },
  removeCustomerError: (state, { payload }) => {
    state.remove.status = ERROR;
    state.error.message = payload;
  },
  removeCustomerStatus: (state, { payload }) => {
    state.remove = payload;
  },
  loadCustomers: (state) => {},
  loadResult: (state, { payload }) => {
    state.list.customers = payload;
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers,
});

export const {
  createCustomer,
  createCustomerResult,
  createCustomerError,
  setForm,
  editCustomer,
  editCustomerResult,
  editCustomerError,
  editCustomerStatus,
  setFormField,
  removeCustomer,
  removeCustomerResult,
  removeCustomerError,
  removeCustomerStatus,
  loadCustomers,
  loadResult,
} = slice.actions;

export default slice.reducer;

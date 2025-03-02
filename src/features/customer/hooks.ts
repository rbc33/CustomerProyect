import { customer } from '~/features/animal/reducers';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PENDING, INPROGRESS } from '~/utilities/helpers';
import * as actions from './reducers';

export const useUpdateFields = (customerID = null) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.customer.edit.status);
  const fields = useSelector((state) => state.customer.form.fields);

  console.log('customer ID ::: ', customerID, status, customerID && status !== INPROGRESS);

  useEffect(() => {
    if (customerID && status === PENDING) {
      dispatch(actions.setForm(customerID));
    }
  }, [customerID, status]);

  return {
    fields,
    setFormField: (field, value) => {
      console.log(`Updating field ${field} to ${value}`);

      dispatch(actions.setFormField({ field, value }));
    },
  };
};

export const useNewCustomer = () => {
  const dispatch = useDispatch();

  return {
    onSubmit: () => {
      console.log('Dispatching CREATE_CUSTOMER action');
      dispatch(actions.createCustomer());
    },
  };
};

export const useCreateCustomerStatus = () => {
  return useSelector((state) => state.customer.create.status);
};

export const useEditCustomer = (customerID) => {
  const dispatch = useDispatch();
  const status = useEditCustomerStatus();

  return {
    status,
    onSubmit: () => {
      console.log('Dispatching EDIT_CUSTOMER action');
      dispatch(actions.editCustomer(customerID));
    },
  };
};

export const useEditCustomerStatus = () => {
  return useSelector((state) => state.customer.edit.status);
};
export const useRemoveCustomer = (customerID: number) => {
  const dispatch = useDispatch();
  const status = useRemoveCustomerStatus();

  return {
    status,
    onRemove: () => {
      console.log('Dispatching DELETE_CUSTOMER action');
      dispatch(actions.removeCustomer(customerID));
    },
  };
};

export const useRemoveCustomerStatus = () => {
  return useSelector((state) => state.customer.remove.status);
};
export const useListCustomers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.loadCustomers());
  }, [dispatch]);
  return useSelector((state) => state.customer.list.customers);
};
export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
  region: string;
};
export type Fields = {
  firstName: string;
  lastName: string;
  active: boolean;
  region: string;
};

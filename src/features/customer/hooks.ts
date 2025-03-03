import { customer } from '~/features/animal/reducers';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PENDING, INPROGRESS } from '~/utilities/helpers';
import * as actions from './reducers';
import { Alert, Platform } from 'react-native';

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

  // Ensure fields.region is never null - use different default for iOS
  const defaultRegion = Platform.OS === 'ios' ? 'Select a region' : '';
  const safeFields = {
    ...fields,
    region: fields?.region || defaultRegion
  };

  return {
    fields: safeFields,
    setFormField: (field, value) => {
      console.log(`Updating field ${field} to ${value}`);
      dispatch(actions.setFormField({ field, value }));
    },
    validateFields: () => {
      if (!fields?.firstName || fields.firstName.trim() === '') {
        Alert.alert('Validation Error', 'First name is required');
        return false;
      }
      if (!fields?.lastName || fields.lastName.trim() === '') {
        Alert.alert('Validation Error', 'Last name is required');
        return false;
      }
      if (!fields?.region || fields.region === '' || fields.region === 'Select a region') {
        Alert.alert('Validation Error', 'Please select a region');
        return false;
      }
      return true;
    }
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

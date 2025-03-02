import { useRoute } from '@react-navigation/native';
import React from 'react';

import Form from '../Form';

import { useEditCustomer } from '../hooks';

const Edit = () => {
  const { params } = useRoute();
  const { customerID } = params;
  const { status, onSubmit } = useEditCustomer(customerID);

  return <Form handleSubmit={onSubmit} status={status} customerID={customerID} />;
};

export default Edit;

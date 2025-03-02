import React from 'react';

import Form from '../Form';
import { useNewCustomer, useCreateCustomerStatus } from '../hooks';

const New = () => {
  const { onSubmit } = useNewCustomer();
  const status = useCreateCustomerStatus();

  return <Form handleSubmit={onSubmit} status={status} customerID={null} />;
};

export default New;

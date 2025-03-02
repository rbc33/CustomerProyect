import { all } from 'redux-saga/effects';
import { watchCreateCustomer } from './create';
import { watchEditCustomer } from './edit';
import { watchLoadCustomers } from './load';
import { watchRemoveCustomer } from './delete';

export default function* customerSaga() {
  yield all([
    watchCreateCustomer(),
    watchEditCustomer(),
    watchLoadCustomers(),
    watchRemoveCustomer(), // Asegúrate de que esta línea esté presente
  ]);
}

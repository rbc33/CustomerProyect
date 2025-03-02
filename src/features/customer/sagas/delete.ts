import { all, put, select, takeLatest, delay } from 'redux-saga/effects';
import * as actions from '../reducers';
import { Fields, Customer } from '../hooks';
import { removeItem, set } from 'src/utilities/async_storage';

export function* watchRemoveCustomer() {
  yield takeLatest(actions.removeCustomer.toString(), takeRemoveCustomer);
}

export function* takeRemoveCustomer(action) {
  console.log('Starting fetch request to API -- DELETE', action);
  const customerID = action.payload;

  try {
    const customers: Customer[] = yield select((state) => state.customer.list.customers);
    console.log('Current Customers:', customers, 'Deleting ID:', customerID);

    // Filter out the habitat with the matching ID
    const result = customers.filter((customer) => customer.id !== customerID);

    console.log('Result after delete:', result);

    // pretend call to API
    yield delay(500);

    // Guardar los cambios en AsyncStorage
    yield set('CUSTOMERS_KEY', result);

    yield put(actions.removeCustomerResult(result));
  } catch (error) {
    console.log('Delete error:', error);
    yield put(actions.removeCustomerError(error.toString()));
  }
}

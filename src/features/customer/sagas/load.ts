import { all, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../reducers';
import { get } from 'src/utilities/async_storage';

export function* watchLoadCustomers() {
  yield takeLatest(actions.loadCustomers.toString(), takeLoadCustomers);
}

export function* takeLoadCustomers() {
  try {
    console.log('Loading customers from AsyncStorage');
    const customers = yield get('CUSTOMERS_KEY');
    console.log('Loaded customers:', customers);

    if (customers) {
      yield put(actions.loadResult(customers));
    } else {
      yield put(actions.loadResult([]));
    }
  } catch (error) {
    console.log('Error loading customers:', error);
    yield put(actions.loadResult([]));
  }
}

export function* watchLoadAnimals() {
  yield takeLatest(actions.loadAnimals.toString(), takeLoadAnimals);
}

export function* takeLoadAnimals() {
  try {
    console.log('Loading animals from AsyncStorage');
    const animals = yield get('ANIMALS_KEY');
    console.log('Loaded animals:', animals);

    if (animals) {
      yield put(actions.loadResult(animals));
    } else {
      yield put(actions.loadResult([]));
    }
  } catch (error) {
    console.log('Error loading animals:', error);
    yield put(actions.loadResult([]));
  }
}

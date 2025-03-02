import { all, put, select, takeLatest, delay } from "redux-saga/effects";
import * as actions from "../reducers";
import { Customer, Fields } from "../hooks";
import { set, get } from "src/utilities/async_storage";

export function* watchCreateCustomer() {
	yield takeLatest(actions.createCustomer.toString(), takeCreateCustomer);
}

export function* takeCreateCustomer() {
	console.log("calling API");

	try {
		const fields: Fields = yield select((state) => state.customer.form.fields);
		const customers: Customer[] = yield select(
			(state) => state.customer.list.customers
		);

		const customer = {
			id: customers.length + 1,
			...fields,
		};
		yield delay(500);
		const result = [customer, ...customers];

		// Guardar en AsyncStorage y verificar
		yield set("CUSTOMERS_KEY", result);
		console.log("Saved customers to AsyncStorage:", result);

		// Verificar que se guardó correctamente
		const savedCustomers: Customer[] = yield get("CUSTOMERS_KEY");
		console.log("Verified saved customers:", savedCustomers);

		yield put(actions.createCustomerResult(result));
	} catch (error) {
		console.log("Error in createCustomer saga:", error);
	}
}

import customer from '~/features/customer/reducers';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  customer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  users: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

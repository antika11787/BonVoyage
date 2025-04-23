import userReducer from "../redux/slices/user";
import categoryReducer from "../redux/slices/category";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

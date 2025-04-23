import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../rootReducer";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "@/utils/storage-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user" , "category"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

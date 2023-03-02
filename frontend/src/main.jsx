import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import appReducer from "./redux/index";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = {
  key: "root",
  storage,
};

const appPersistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: appPersistedReducer,
});
const appPersistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={appPersistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

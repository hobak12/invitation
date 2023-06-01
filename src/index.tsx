import { Provider } from "react-redux";
import store from "./redux/config/configstore";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { courseApi } from "./redux/modules/apiSlice";
import "./locales";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApiProvider api={courseApi}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApiProvider>
);

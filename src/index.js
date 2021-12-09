import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store,persistor } from "./store/store";

import { PersistGate } from 'redux-persist/integration/react'


import zhCN from "antd/lib/locale/zh_CN"
import {ConfigProvider} from "antd";
// 持久化存储

import "antd/dist/antd.less";

import "./styles/common/comm.less";
import "./styles/common/commAnima.less"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={zhCN}>
              <App />
          </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

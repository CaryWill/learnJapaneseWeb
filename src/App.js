import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// TODO: use babel-plugin-module-resolver
import { rootReducer } from "./reducers";
import { Sidebar } from "./components";
import styles from "./styles/styles.module.scss";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Sidebar />
      </div>
    </Provider>
  );
}

export default App;

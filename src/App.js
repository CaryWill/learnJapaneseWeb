import React, { useEffect } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// TODO: use babel-plugin-module-resolver
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";
import { Sidebar, ReadingPanel } from "./components";
import styles from "./styles/styles.module.scss";
import { login } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(rootSaga);

function App() {
  useEffect(() => {
    store.dispatch(
      login(localStorage.getItem("account"), localStorage.getItem("password"))
    );
  }, []);

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Sidebar />
        <ReadingPanel />
      </div>
    </Provider>
  );
}

export default App;

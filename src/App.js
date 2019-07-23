import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route,Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose,createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { login } from "./actions";
import { NotFound } from "./components";
// TODO: use babel-plugin-module-resolver
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";
import {Home} from "./pages";

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
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postId" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

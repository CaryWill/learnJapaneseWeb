import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route,Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose,createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { login, updateCurrentReadPostId } from "./actions";
import { NotFound,ReadingPanel, Sidebar } from "./components";
// TODO: use babel-plugin-module-resolver
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";
import styles from "./styles/styles.module.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(rootSaga);

class Home extends React.Component {
  componentDidUpdate(prevProps) {
    // FIXME: use history.location won't work
    // so, what's the differeces between history.location and location in props
    const oldLocationState = prevProps.location.state;
    const locationState = this.props.location.state;
    // update current reading post when url changed
    // if you're in other component you can use withRouter and get the location
    if (
      oldLocationState &&
      locationState &&
      oldLocationState.id !== locationState.id
    ) {
      store.dispatch(updateCurrentReadPostId(locationState.id));
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Sidebar />
        <ReadingPanel />
      </div>
    );
  }
}

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

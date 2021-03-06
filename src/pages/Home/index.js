import React from "react";
import {updateCurrentReadPostId} from "../../actions";
import {connect} from "react-redux";
import {ReadingPanel, Sidebar} from "../../components"
import styles from "./styles.module.scss";


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
      this.props.dispatch(updateCurrentReadPostId(locationState.id));
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

export default connect()(Home);
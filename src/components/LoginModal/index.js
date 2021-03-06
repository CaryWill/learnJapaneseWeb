import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types"

import {login} from "../../actions";
import styles from "./styles.module.scss";

class LoginModal extends React.Component {
  state = {
    email: "",
    password: "",
    errmsg: ""
  };

  emailRef = React.createRef();

  modalRef = React.createRef();

  componentDidMount() {
    if (this.emailRef.current) {
      this.emailRef.current.focus();
    }
    this.modalRef.current.addEventListener("keydown", this.triggerConfirm);
  }

  componentWillUnmount() {
    this.modalRef.current.removeEventListener("keydown", this.triggerConfirm);
  }

  triggerConfirm = e => {
    if (e.keyCode === 13) {
      this.onConfirm();
    }
  };

  onEmailChange = event => {
    this.setState({email: event.target.value, errmsg: ""});
  };

  onPasswordChange = event => {
    this.setState({password: event.target.value, errmsg: ""});
  };

  onSuccess = () => {
    this.props.onCancel();
  };

  onFail = () => {
    this.setState({errmsg: "账号或密码错误!"});
  };

  onConfirm = () => {
    this.props.dispatch(
      login(this.state.email, this.state.password, this.onSuccess, this.onFail)
    );
  };

  renderLogin = () => {
    return (
      <>
        <input
          value={this.state.email}
          onChange={this.onEmailChange}
          placeholder="邮箱"
          ref={this.emailRef}
        />
        <input
          value={this.state.password}
          onChange={this.onPasswordChange}
          placeholder="密码"
        />
        <div className={styles.actionBar}>
          <span
            className={classNames(styles.base, styles.cancel)}
            onClick={this.props.onCancel}
          >
            取消
          </span>
          <span
            className={classNames(styles.base, styles.confirm)}
            onClick={this.onConfirm}
          >
            确认
          </span>
        </div>
        {this.state.errmsg && (
          <span className={styles.errmsg}>{`错误提示: ${
            this.state.errmsg
            }`}</span>
        )}
      </>
    );
  };

  renderLogout = () => {
    return (
      <button
        onClick={() => {
          this.props.dispatch(login());
          // dismiss modal after logout
          this.props.onCancel();
        }}
        className={styles.logout}
      >
        logout
      </button>
    );
  };

  render() {
    return (
      <div className={classNames(styles.modal, this.props.visible && styles.show)} ref={this.modalRef}>
        <div className={styles.body}>
          {this.props.user.email ? this.renderLogout() : this.renderLogin()}
        </div>
      </div>
    );
  }
}

LoginModal.protoType = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool
}

export default connect(({user}) => ({user: user}))(LoginModal)
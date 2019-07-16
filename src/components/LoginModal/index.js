import React from "react";
import styles from "./styles.module.scss";
import { login } from "../../actions";
import { connect } from "react-redux";
import classNames from "classnames";

class LoginModal extends React.Component {
  state = {
    email: "",
    password: "",
    errmsg: ""
  };

  emailRef = React.createRef();

  componentDidMount() {
    this.emailRef.current.focus();
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value, errmsg: "" });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value, errmsg: "" });
  };

  onSuccess = () => {
    this.props.onCancel();
  };

  onFail = () => {
    this.setState({ errmsg: "账号或密码错误!" });
  };

  onConfirm = () => {
    this.props.dispatch(
      login(this.state.email, this.state.password, this.onSuccess, this.onFail)
    );
  };

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.body}>
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
        </div>
      </div>
    );
  }
}

export default connect()(LoginModal);
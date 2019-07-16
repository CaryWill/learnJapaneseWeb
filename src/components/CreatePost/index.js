import React from "react";
import styles from "./styles.module.scss";
import { postApi } from "../../services";
import classNames from "classnames";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import ReactMarkdown from "react-markdown/with-html";

class CreatePostModal extends React.Component {
  // TODO: 增加 tag 也就是 category 的功能
  state = {
    title: "",
    body: "",
    showPreview: true
  };

  titleInputRef = React.createRef();

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  onChangeTitleInput = event => {
    this.setState({ title: event.target.value });
  };

  onChangeBodyInput = event => {
    this.setState({ body: event.target.value });
  };

  publish = () => {
    const date = Date.now();
    const artist = this.props.user.email;
    const type = "article";
    const title = this.state.title;
    const body = this.state.body;
    const categories = ["Others"];
    const id = uuid();
    const description = "";
    const params = {
      date,
      artist,
      type,
      title,
      body,
      categories,
      id,
      description
    };

    postApi(params).then(this.props.onCancel);
  };

  togglePreview = () => {
    this.setState(prevState => ({ showPreview: !prevState.showPreview }));
  };

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.body}>
          <input
            placeholder="Title"
            className={styles.inputTitle}
            value={this.state.title}
            onChange={this.onChangeTitleInput}
            ref={this.titleInputRef}
          />
          <textarea
            placeholder="Write the post, change the world..."
            onChange={this.onChangeBodyInput}
            value={this.state.body}
          />
          <div className={styles.actionBar}>
            <span
              className={classNames(styles.base, styles.cancel)}
              onClick={this.props.onCancel}
            >
              取消
            </span>
            <span
              className={classNames(styles.base, styles.previewBtn)}
              onClick={this.togglePreview}
            >
              {this.state.showPreview ? "预览" : "关闭预览"}
            </span>
            <span
              className={classNames(styles.base, styles.confirm)}
              onClick={this.publish}
            >
              发布
            </span>
          </div>
        </div>
        {this.state.showPreview && (
          <div className={styles.preview}>
            <span className={styles.title}>{this.state.title}</span>
            <ReactMarkdown
              className="markdown-body"
              escapeHtml={false}
              source={this.state.body}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ user }) => ({ user }))(CreatePostModal);

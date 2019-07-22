import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { connect } from "react-redux";
import uuid from "uuid/v4";

import { postApi } from "../../services";
import styles from "./styles.module.scss";

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

  setBody = text => {
    this.setState({ body: text });
  };

  setTitle = text => {
    this.setState({ title: text });
  };

  onChangeTitleInput = event => {
    this.setState({ title: event.target.value });
  };

  onChangeBodyInput = event => {
    this.setState({ body: event.target.value });
  };

  publish = () => {
    const { mode } = this.props;
    // default to create mode
    const body = this.state.body;
    const title = this.state.title;
    const description = "";
    const type = "article";
    const artist = this.props.user.email;
    const date = Date.now();
    const categories = ["Others"];
    let id = uuid();
    if (mode === "edit") {
      // 保留之前的 post id，因为这个 id 要用来在数据库中作为索引寻找正在修改的 post 一遍 更新 update post
      id = this.props.currentPost.id;
    }

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
      <div
        className={classNames(styles.modal, this.props.visible && styles.show)}
      >
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
              {this.state.showPreview ? "关闭预览" : "预览"}
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

export default connect(
  ({ user }) => ({ user }),
  null,
  null,
  { forwardRef: true }
)(CreatePostModal);

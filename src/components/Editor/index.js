import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import {connect} from "react-redux";
import uuid from "uuid/v4";

import {postApi} from "../../services";
import styles from "./styles.module.scss";

class Editor extends React.Component {
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

  init = (title, body) => {
    if (title) this.setState({title})
    if (body) this.setState({body})
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value});
  };

  onChangeBodyInput = event => {
    this.setState({body: event.target.value});
  };

  publish = () => {
    const {mode} = this.props;
    // default to `CREATE` mode
    const body = this.state.body;
    const title = this.state.title;
    const description = "";
    const type = "article";
    const artist = this.props.user.email;
    const date = Date.now();
    const categories = ["Others"];
    let id = uuid();
    if (mode === "edit") {
      // NOTE: `edit` mode should keep post id unchanged, since we use post id to keep track of post in datebase. 
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
    this.setState(prevState => ({showPreview: !prevState.showPreview}));
  };

  renderActionsBar = () => {
    const actions = {onCancel: "取消", togglePreview: this.state.showPreview ? "关闭预览" : "预览", publish: "发布"}

    return (<div className={styles.actionBar}>
      {Object.keys(actions).map(
        action => (<span
          key={action}
          className={classNames(styles.base, styles[action])}
          onClick={this.props[action] || this[action]}
        >
          {actions[action]}
        </span>)
      )}
    </div>)
  }

  renderPreview = () => {
    return (<div className={styles.preview}>
      <span className={styles.title}>{this.state.title}</span>
      <ReactMarkdown
        className="markdown-body"
        escapeHtml={false}
        source={this.state.body}
      />
    </div>)
  }

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
            style={{fontSize: "15px"}}
          />
          {this.renderActionsBar()}
        </div>
        {this.state.showPreview && this.renderPreview()}
      </div>
    );
  }
}

export default connect(
  ({user}) => ({user}),
  null,
  null,
  {forwardRef: true}
)(Editor);

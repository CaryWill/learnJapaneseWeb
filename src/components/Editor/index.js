import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import {connect} from "react-redux";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

import {postApi} from "../../services";
import styles from "./styles.module.scss";
import {propTypes} from "react-markdown/lib/with-html";

class Editor extends React.Component {
  state = {
    title: "",
    body: "",
    categories: "",
    showPreview: true
  };

  titleInputRef = React.createRef();

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  init = (title, body, categories) => {
    if (title) this.setState({title})
    if (body) this.setState({body})
    if (categories) this.setState({categories: JSON.stringify(categories)})
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value});
  };

  onChangeBodyInput = event => {
    this.setState({body: event.target.value});
  };

  onChangeCategories = event => {
    this.setState({categories: event.target.value});
  }

  publish = () => {
    const {mode} = this.props;
    // default to `CREATE` mode
    const body = this.state.body;
    const title = this.state.title;
    const description = "";
    const type = "article";
    const artist = this.props.user.email;
    const date = Date.now();
    const categories = JSON.parse(this.state.categories);
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
          <input
            placeholder={`请选择文章文类哦，格式如下，["music"]`}
            className={styles.inputCategories}
            value={this.state.categories}
            onChange={this.onChangeCategories}
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

Editor.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["edit", "create"]),
  currentPost: PropTypes.shape({
    date: PropTypes.string,
    artist: PropTypes.string,
    type: PropTypes.oneOf(["article", "music", "video"]),
    title: PropTypes.string,
    body: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    description: PropTypes.string
  })
}

Editor.defaultProps = {
  mode: "create",
  visible: false
}

export default connect(
  ({user}) => ({user}),
  null,
  null,
  {forwardRef: true}
)(Editor);

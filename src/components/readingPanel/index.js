import {message} from "antd";
import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import {connect} from "react-redux";

import {Editor} from "..";
import {
  deletePost,
  updateCurrentReadPostId,
  updatePosts
} from "../../actions";
import styles from "./styles.module.scss";

class ReadingPanel extends React.Component {
  state = {
    showEditor: false,
    editorMode: "create" /** create | edit */
  };

  componentDidMount() {
    this.initDisqus()
  }

  componentDidUpdate({currentReadPostId: prevCId}) {
    if (prevCId !== this.props.currentReadPostId) {
      this.initDisqus();
    }
  }

  editorRef = React.createRef();

  initDisqus = () => {
    /** https://help.disqus.com/en/articles/1717137-use-configuration-variables-to-avoid-split-threads-and-missing-comments */
    var disqus_config = function () {
      this.page.identifier = this.props.currentReadPostId;
    };

    var d = document, s = d.createElement('script');
    s.src = 'https://ljp-web.disqus.com/embed.js';
    s.setAttribute('data-timestamp', + new Date());
    (d.head || d.body).appendChild(s);
  }

  createPost = () => {
    this.setState({showEditor: true, editorMode: "create"});
  };

  editPost = (post) => {
    if (!post) {
      return message.error("没有选中的文章!")
    }

    this.setState({showEditor: true, editorMode: "edit"});
    // Initialize editor
    this.editorRef.current.init(post.title, post.body);
  };

  deletePost = (post) => {
    if (!post)
      return message.error("当前没有选中的文章")
    // TODO: prompt since it's a destructive action

    // reset current read post id
    const {dispatch} = this.props;
    dispatch(updateCurrentReadPostId(""));
    dispatch(deletePost(this.props.currentReadPostId));
  };

  dismissEditor = () => {
    this.setState({showEditor: false});
    // Update posts after create new post
    this.props.dispatch(updatePosts());
  };

  renderContent = (post) => {
    // No current reading post
    if (!post) {
      return (<div className={styles.placeholder}>
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🍩
        </span>
        <span>Reading is the most wonderful thing in the world</span>
      </div>)
    }
    // Got posts

    return (
      <>
        <span className={styles.title}>{(post && post.title) || ""}</span>
        <h6 style={{textAlign: "right"}}>{post.date.slice(0, 10)}</h6>
        <ReactMarkdown
          className="markdown-body"
          escapeHtml={false}
          source={(post && post.body) || "No content."}
        />
      </>
    );
  };

  renderPostActionBar = () => {
    const {posts, currentReadPostId: cId} = this.props;
    const post = posts.all.find(
      p => p.id === cId
    );
    const actions = ["deletePost", "editPost", "createPost"];

    return (
      <div className={styles.postActions}>
        {actions.map(a => (
          <button key={a} className={classNames(styles.basePostActionButton, styles[a])} onClick={() => this[a](post)}>
            {a.replace("Post", "")}
          </button>
        ))}
      </div>
    );
  };

  render() {
    const {posts, currentReadPostId: cId, user} = this.props;
    const currentPost = posts.all.find(
      p => p.id === cId
    );

    return (
      <div className={styles.readingPanel}>
        {this.renderContent(currentPost)}
        {user.email &&
          this.renderPostActionBar()}
        <Editor
          onCancel={this.dismissEditor}
          visible={this.state.showEditor}
          ref={this.editorRef}
          mode={this.state.editorMode}
          currentPost={currentPost}
        />
        <div id="disqus_thread" className={cId === "" ? styles.hide : styles.show}></div>
      </div>
    );
  }
}

export default connect(({posts, currentReadPostId, user}) => ({
  posts,
  currentReadPostId,
  user
}))(ReadingPanel);

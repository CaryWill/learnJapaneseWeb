import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown/with-html";
import { CreatePostModal } from "..";
import {
  updatePosts,
  deletePost,
  updateCurrentReadPostId
} from "../../actions";
import { message } from "antd";

class ReadingPanel extends React.Component {
  state = {
    showCreatePostModal: false,
    // default is create a post mode when open create post modal
    createPostModalMode: "create"
  };

  createPostModalRef = React.createRef();

  renderContent = () => {
    const { posts, currentReadPostId } = this.props;
    const post = posts.all.find(p => p.id === currentReadPostId);

    let body;
    if (posts.all.length === 0 || currentReadPostId === "") {
      body = (
        <div className={styles.placeholder}>
          <div>
            <span role="img" aria-label="jsx-a11y/accessible-emoji">
              🍩
            </span>
          </div>
          <div>Reading is the most wonderful thing in the world</div>
        </div>
      );
    } else {
      body = (
        <ReactMarkdown
          className="markdown-body"
          escapeHtml={false}
          source={(post && post.body) || post.description || "404"}
        />
      );
    }

    return (
      <>
        <span className={styles.title}>{(post && post.title) || ""}</span>
        {body || ""}
      </>
    );
  };

  createPost = () => {
    this.setState({ showCreatePostModal: true, createPostModalMode: "create" });
  };

  editPost = () => {
    const currentPost = this.props.posts.all.find(
      p => p.id === this.props.currentReadPostId
    );

    if (currentPost) {
      this.setState({ showCreatePostModal: true, createPostModalMode: "edit" });
      // initialize editor
      this.createPostModalRef.current.setTitle(currentPost.title || "");
      this.createPostModalRef.current.setBody(currentPost.body || "");
    } else {
      message.error("没有选中的文章!");
    }
  };

  deletePost = () => {
    if (this.props.currentReadPostId === "") message.error("当前没有选中的文章")
    // TODO: prompt since it's a destructive action
    // reset current read post id
    this.props.dispatch(updateCurrentReadPostId(""));

    this.props.dispatch(deletePost(this.props.currentReadPostId));
  };

  dismissCreatePostModal = () => {
    this.setState({ showCreatePostModal: false });
    // update home's recent post list
    this.props.dispatch(updatePosts());
  };

  // TODO: delete button should be red when hover
  renderPostActionButton = () => {
    return (
      <div className={styles.postActions}>
        <button className={styles.createPostButton} onClick={this.deletePost}>
          删除
        </button>
        <button className={styles.createPostButton} onClick={this.editPost}>
          修改
        </button>
        <button className={styles.createPostButton} onClick={this.createPost}>
          创建
        </button>
      </div>
    );
  };

  render() {
    const currentPost = this.props.posts.all.find(
      p => p.id === this.props.currentReadPostId
    );

    return (
      <div className={styles.readingPanel}>
        {this.renderContent()}
        {this.props.user &&
          this.props.user.email &&
          this.renderPostActionButton()}
        <CreatePostModal
          onCancel={this.dismissCreatePostModal}
          visible={this.state.showCreatePostModal}
          ref={this.createPostModalRef}
          mode={this.state.createPostModalMode}
          currentPost={currentPost}
        />
      </div>
    );
  }
}

export default connect(({ posts, currentReadPostId, user }) => ({
  posts,
  currentReadPostId,
  user
}))(ReadingPanel);

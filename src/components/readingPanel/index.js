import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown/with-html";
import { CreatePostModal } from "..";
import { updatePosts } from "../../actions";

class ReadingPanel extends React.Component {
  state = { showCreatePostModal: false };

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
    this.setState({ showCreatePostModal: true });
  };

  dismissCreatePostModal = () => {
    this.setState({ showCreatePostModal: false });
    // update home's recent post list
    this.props.dispatch(updatePosts());
  };

  renderCreatePostButton = () => {
    return (
      <button className={styles.createPostButton} onClick={this.createPost}>
        New Post
      </button>
    );
  };

  render() {
    return (
      <div className={styles.readingPanel}>
        {this.renderContent()}
        {this.props.user &&
          this.props.user.email &&
          this.renderCreatePostButton()}
        {this.state.showCreatePostModal && (
          <CreatePostModal onCancel={this.dismissCreatePostModal} />
        )}
      </div>
    );
  }
}

export default connect(({ posts, currentReadPostId, user }) => ({
  posts,
  currentReadPostId,
  user
}))(ReadingPanel);

import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";

class ReadingPanel extends React.Component {
  renderContent = () => {
    const { posts, currentReadPostId } = this.props;
    const post = posts.all.find(p => p.id === currentReadPostId);
    if (posts.all.length === 0 || currentReadPostId === "") {
      return <span>Try find some article to read</span>;
    } else {
      return <p>{post && post.body || post.description || "404"}</p>;
    }
  };

  render() {
    return this.renderContent();
  }
}

export default connect(({ posts, currentReadPostId }) => ({
  posts,
  currentReadPostId
}))(ReadingPanel);

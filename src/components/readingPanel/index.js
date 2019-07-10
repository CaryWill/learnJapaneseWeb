import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";

class ReadingPanel extends React.Component {
  renderContent = () => {
    const { posts, currentReadPostId } = this.props;
    const post = posts.all.find(p => p.id === currentReadPostId);

    const parseHtml = htmlParser({
      isValidNode: node => node.type !== "script",
      processingInstructions: [
        /* ... */
      ]
    });

    let body;
    if (posts.all.length === 0 || currentReadPostId === "") {
      body = (
        <span className={styles.title}>Try find some article to read</span>
      );
    } else {
      body = (
        <ReactMarkdown
          className="markdown-body"
          astPlugins={[parseHtml]}
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

  render() {
    return <div className={styles.readingPanel}>{this.renderContent()}</div>;
  }
}

export default connect(({ posts, currentReadPostId }) => ({
  posts,
  currentReadPostId
}))(ReadingPanel);

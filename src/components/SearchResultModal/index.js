import React from "react";
import {Link} from "react-router-dom";

import classNames from "classnames";
import {connect} from "react-redux";
import {updateCurrentReadPostId} from "../../actions";
import styles from "./styles.module.scss";

class SearchResultModal extends React.Component {

  // TODO: add search input

  onRowClick = (post) => {
    const {dispatch, onCancel} = this.props;
    dispatch(updateCurrentReadPostId(post.id));
    onCancel()
  }

  renderPosts = () => {
    const {posts, currentReadPostId: cId, initialSearchKeyword} = this.props;

    const articles = posts.all.filter(p =>
      p.body
        ? p.body
          .toLowerCase()
          .includes(initialSearchKeyword)
        : false
    )

    return (
      <section className={styles.posts}>
        {articles.map(p => (
          <div
            className={classNames(
              styles.postRow,
              cId === p.id && styles.active
            )}
            key={p.id}
            onClick={() => this.onRowClick(p)}
          >
            <Link
              style={{color: "inherit", textDecoration: "inherit"}}
              to={{pathname: `/post/${p.title}`, state: {id: p.id}}}
            >
              <span className={styles.postRowTitle}>{p.title}</span>
              <span className={styles.postRowTimestamp}>
                {p.date.slice(0, 10)}
              </span>
            </Link>
          </div>
        ))}
      </section>
    );
  };


  render() {
    const {onCancel, visible} = this.props;
    return (<div className={classNames(styles.modal, visible && styles.show)}>
      <div className={styles.body}>
        <span
          onClick={onCancel}
          className={styles.closeSign}
        >
          &#10006;
              </span>
        <span className={styles.modalTitle}>文章列表</span>
        {this.renderPosts()}
      </div>
    </div>)
  }
}

export default connect(({posts}) => ({posts}))(SearchResultModal)
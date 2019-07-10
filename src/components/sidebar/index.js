import React from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { updatePosts, updateCurrentReadPostId } from "../../actions";

const { Search } = Input;
class Sidebar extends React.Component {
  componentDidMount() {
    this.props.dispatch(updatePosts());
  }

  render() {
    const { posts: articles } = this.props;
    return (
      <div className={styles.sidebar}>
        <div className={styles.logoBox}>
          <img
            src={`${process.env.PUBLIC_URL}/icon.png`}
            alt="icon"
            className={styles.logo}
          />
          <span className={styles.slogan}>こんにちは。</span>
        </div>
        <Search
          placeholder="搜索"
          onSearch={value => console.log(value)}
          className={styles.searchbar}
        />
        <section className={styles.recentPosts}>
          {articles && articles.all && articles.all.length > 0 && (
            <span className={styles.recentPostsHeader}>近期文章</span>
          )}
          {articles.all.slice(0, 10).map(p => (
            <div className={styles.postRow} key={p.title}>
              <span
                className={styles.postRowTitle}
                onClick={() => {
                  this.props.dispatch(updateCurrentReadPostId(p.id));
                }}
              >
                {p.title}
              </span>
              <span className={styles.postRowTimestamp}>{p.date.slice(0,10)}</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default connect(({ posts }) => ({ posts }))(Sidebar);

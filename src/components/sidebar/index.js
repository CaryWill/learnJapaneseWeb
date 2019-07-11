import React from "react";
import { Input, Modal } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { updatePosts, updateCurrentReadPostId } from "../../actions";

const { Search } = Input;
class Sidebar extends React.Component {
  state = {
    isDropdown: false,
    showSearchResultModal: false,
    searchKeyword: ""
  };

  componentDidMount() {
    this.props.dispatch(updatePosts());
  }

  onSearch = keyword => {
    this.setState({ showSearchResultModal: true, searchKeyword: keyword });
  };

  dismissSearchResultModal = () => {
    this.setState({ showSearchResultModal: false });
  };

  renderPosts = (articles, limit = 10, showTitle = true) => {
    return (
      <section className={styles.recentPosts}>
        {articles && articles.length > 0 && showTitle && (
          <span className={styles.recentPostsHeader}>近期文章</span>
        )}
        {articles.slice(0, limit).map(p => (
          <div className={styles.postRow} key={p.title}>
            <span
              className={styles.postRowTitle}
              onClick={() => {
                this.props.dispatch(updateCurrentReadPostId(p.id));
              }}
            >
              {p.title}
            </span>
            <span className={styles.postRowTimestamp}>
              {p.date.slice(0, 10)}
            </span>
          </div>
        ))}
      </section>
    );
  };

  renderCategories = articles => {
    const categories = articles.reduce((p, c) => {
      p = [...p, ...c.categories];
      return p;
    }, []);
    console.log(categories);
    const uniqueCategories = [...new Set(categories)];

    return (
      <section className={styles.recentPosts}>
        {articles && articles.length > 0 && (
          <span className={styles.recentPostsHeader}>分类</span>
        )}
        {uniqueCategories.map(c => {
          return (
            <div className={styles.categoryRow}>
              <span>{c}</span>
              <span className={styles.count}>{`(${articles.filter(a => a.categories.includes(c)).length})`}</span>
            </div>
          );
        })}
      </section>
    );
  };

  render() {
    const { posts: articles } = this.props;

    return (
      <div className={styles.sidebar}>
        <Modal
          title="搜索结果"
          onCancel={this.dismissSearchResultModal}
          visible={this.state.showSearchResultModal}
          footer={null}
        >
          {this.renderPosts(
            articles.all.filter(p =>
              p.description.toLowerCase().includes(this.state.searchKeyword)
            ) || [],
            100,
            false
          )}
        </Modal>
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
          onSearch={value => this.onSearch(value)}
          className={styles.searchbar}
        />
        {this.renderPosts(articles.all, 10)}
        {this.renderCategories(articles.all)}
      </div>
    );
  }
}

export default connect(({ posts }) => ({ posts }))(Sidebar);

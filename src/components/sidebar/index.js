import React from "react";
import { Input, Modal } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { updatePosts, updateCurrentReadPostId, login } from "../../actions";
import classNames from "classnames";

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
          <div
            className={styles.postRow}
            key={p._id}
            onClick={() => {
              this.props.dispatch(updateCurrentReadPostId(p.id));
              this.setState({ showSearchResultModal: false });
            }}
          >
            <span className={styles.postRowTitle}>{p.title}</span>
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
    const uniqueCategories = [...new Set(categories)];

    return (
      <section className={styles.recentPosts}>
        {articles && articles.length > 0 && (
          <span className={styles.recentPostsHeader}>分类</span>
        )}
        {uniqueCategories.map((c, index) => {
          return (
            <div className={styles.categoryRow} key={index}>
              <span>{c}</span>
              <span className={styles.count}>{`(${
                articles.filter(a => a.categories.includes(c)).length
              })`}</span>
            </div>
          );
        })}
      </section>
    );
  };

  renderHeader = () => {
    return (
      <nav>
        {["近期文章" /** , "分类"*/].map((c, index) => {
          return (
            <span
              className={classNames(styles.item, styles.mobile)}
              onClick={() => this.setState({ showSearchResultModal: true })}
              key={index}
            >
              {c}
            </span>
          );
        })}
        <span className={styles.item} onClick={()=> this.props.dispatch(login("admin","admin"))}>{
          this.props.user.status === "success" ? this.props.user.email : "登陆"
        }</span>
      </nav>
    );
  };

  render() {
    const { posts: articles } = this.props;

    return (
      <div className={styles.sidebar}>
        <Modal
          title="文章"
          onCancel={this.dismissSearchResultModal}
          visible={this.state.showSearchResultModal}
          footer={null}
        >
          {this.renderPosts(
            articles.all.filter(p =>
              p.description ? p.description.toLowerCase().includes(this.state.searchKeyword) : p
            ),
            100,
            false
          )}
        </Modal>
        {this.renderHeader()}
        <Search
          placeholder="搜索"
          onSearch={value => this.onSearch(value)}
          className={styles.searchbar}
        />
        <div className={styles.desktop}>
          {this.renderPosts(articles.all, 10)}
        </div>
        <div className={styles.desktop}>
          {this.renderCategories(articles.all)}
        </div>
      </div>
    );
  }
}

export default connect(({ posts, user }) => ({ posts, user }))(Sidebar);

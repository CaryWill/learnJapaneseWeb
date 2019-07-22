import React from "react";
import {Input} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";

import {LoginModal, SearchResultModal} from "..";
import {updateCurrentReadPostId, updatePosts} from "../../actions";

import styles from "./styles.module.scss";

const {Search} = Input;
class Sidebar extends React.Component {
  state = {
    isDropdown: false,
    showSearchResultModal: false,
    showLoginModal: false,
    searchKeyword: "",
    isViewAllPosts: false,
    currentOpenedCategory: ""
  };

  componentDidMount() {
    this.props.dispatch(updatePosts());
  }

  onSearch = keyword => {
    this.setState({showSearchResultModal: true, searchKeyword: keyword});
  };

  dismissSearchResultModal = () => {
    this.setState({showSearchResultModal: false});
  };

  dismissLoginModal = () => {
    this.setState({showLoginModal: false});
  };

  toggleViewAllPosts = () => {
    this.setState(prevState => {
      return {isViewAllPosts: !prevState.isViewAllPosts};
    });
  };

  renderPosts = (articles, limit = 200, showTitle = true) => {
    return (
      <section className={styles.recentPosts}>
        {articles && articles.length > 0 && showTitle && (
          <div className={styles.postsHeaderBox}>
            <span className={styles.recentPostsHeader}>近期文章</span>
            <span
              className={styles.viewAllPosts}
              onClick={this.toggleViewAllPosts}
            >
              {this.state.isViewAllPosts ? "收起" : "查看全部"}
            </span>
          </div>
        )}
        {articles.slice(0, this.state.isViewAllPosts ? limit : 3).map(p => (
          <div
            className={classNames(
              styles.postRow,
              this.props.currentReadPostId === p.id && styles.active
            )}
            key={p._id}
            onClick={() => {
              this.props.dispatch(updateCurrentReadPostId(p.id));
              this.setState({showSearchResultModal: false});
            }}
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

  renderCategories = (articles = []) => {
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
            <React.Fragment key={c}>
              <div
                className={styles.categoryRow}
                key={index}
                onClick={() =>
                  this.setState({
                    // 重复点击可 toggle
                    currentOpenedCategory:
                      this.state.currentOpenedCategory === c ? "" : c
                  })
                }
              >
                <div className={styles.categoryRowText}>
                  <span>{c}</span>
                  <span className={styles.count}>{`(${
                    articles.filter(a => a.categories.includes(c)).length
                    })`}</span>
                </div>
                <span>
                  {this.state.currentOpenedCategory === c ? "∙" : "◦"}
                </span>
              </div>
              {this.state.currentOpenedCategory === c && (
                <div className={styles.postsByCategory}>
                  {articles
                    .filter(a => a.categories.includes(c))
                    .map(p => (
                      <div
                        className={styles.categoryPostRow}
                        onClick={() => {
                          this.props.dispatch(updateCurrentReadPostId(p.id));
                          this.setState({showSearchResultModal: false});
                        }}
                        key={p._id}
                      >
                        <Link
                          style={{
                            color: "inherit",
                            textDecoration: "inherit"
                          }}
                          to={{
                            pathname: `/post/${p.title}`,
                            state: {id: p.id}
                          }}
                        >
                          <span className={styles.postRowTitle}>{p.title}</span>
                          <span className={styles.postRowTimestamp}>
                            {p.date.slice(0, 10)}
                          </span>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </React.Fragment>
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
              onClick={() => this.setState({showSearchResultModal: true})}
              key={index}
            >
              {c}
            </span>
          );
        })}
        <span
          className={classNames(styles.item, styles.login)}
          onClick={() => {
            this.setState({showLoginModal: true});
          }}
        >
          {this.props.user.status === "success"
            ? this.props.user.email
            : "登陆"}
        </span>
      </nav>
    );
  };

  render() {
    const {posts: articles} = this.props;
    const {showLoginModal, showSearchResultModal, searchKeyword} = this.state;

    return (
      <div className={styles.sidebar}>
        <LoginModal onCancel={this.dismissLoginModal} visible={showLoginModal} />
        <SearchResultModal visible={showSearchResultModal} onCancel={this.dismissSearchResultModal} initialSearchKeyword={searchKeyword} />
        {this.renderHeader()}
        <Search
          placeholder="搜索"
          onSearch={value => this.onSearch(value)}
          className={styles.searchbar}
        />
        <div className={styles.desktop}>
          {this.renderPosts(articles.all, 100)}
        </div>
        <div className={styles.desktop}>
          {this.renderCategories(articles.all)}
        </div>
      </div>
    );
  }
}

export default connect(({posts, user, currentReadPostId}) => ({
  posts,
  user,
  currentReadPostId
}))(Sidebar);

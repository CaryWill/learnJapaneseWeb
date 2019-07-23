import {Input} from "antd";
import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {LoginModal, SearchResultModal} from "..";
import {updateCurrentReadPostId, updatePosts} from "../../actions";
import {capitalize} from "../utility"
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

  toggleCategory = (category) => {
    this.setState({
      // 重复点击可 toggle
      currentOpenedCategory:
        this.state.currentOpenedCategory === category ? "" : category
    })
  }

  onRowClick = (post) => {
    this.props.dispatch(updateCurrentReadPostId(post.id));
    this.setState({showSearchResultModal: false});
  }

  renderPostRow = (p, className) => {
    return (<div
      className={classNames(
        className,
        this.props.currentReadPostId === p.id && styles.active
      )}
      key={p._id}
      onClick={() => this.onRowClick(p)}
    >
      <Link
        style={{color: "inherit", textDecoration: "inherit"}}
        to={{pathname: `/post/${p.date.slice(0, 10)}/${p.title}#disqus_thread`, state: {id: p.id}}}
      >
        <time dateTime={p.date.slice(0, 10)} className={styles.postRowTitle}>{p.title}</time>
      </Link>
    </div>)
  }

  renderCategoryRow = (category, articles = []) => {
    const count = articles.filter(a => a.categories.includes(category)).length;
    const {currentOpenedCategory} = this.state;
    return (
      <React.Fragment key={category}>
        <div
          className={styles.categoryRow}
          key={category}
          onClick={() => this.toggleCategory(category)
          }
        >
          <div className={styles.categoryRowText}>
            <span>{capitalize(category)}</span>
            <span className={styles.count}>{count}</span>
          </div>
          <span>
            {currentOpenedCategory === category ? "∙" : "◦"}
          </span>
        </div>
        {currentOpenedCategory === category && (
          <div className={styles.postsByCategory}>
            {articles
              .filter(a => a.categories.includes(category))
              .map(p => (
                this.renderPostRow(p, styles.categoryPostRow)
              ))}
          </div>
        )}
      </React.Fragment>
    )
  }

  renderPosts = (articles = []) => {
    return (
      <section className={styles.recentPosts}>
        <div className={styles.postsHeaderBox}>
          <span className={styles.recentPostsHeader}>近期文章</span>
          <span
            className={styles.viewAllPosts}
            onClick={this.toggleViewAllPosts}
          >
            {this.state.isViewAllPosts ? "收起" : "查看全部"}
          </span>
        </div>
        {articles.slice(0, this.state.isViewAllPosts ? articles.length : 3).map(p => (
          this.renderPostRow(p, styles.postRow)
        ))}
      </section>
    );
  };

  renderCategories = (articles = []) => {
    const categories = articles.reduce((p, c) => {
      return [...p, ...c.categories];
    }, []);
    const uniqueCategories = [...new Set(categories)];

    return (
      <section className={styles.recentPosts}>
        <span className={styles.recentPostsHeader}>分类</span>
        {uniqueCategories.map(category => this.renderCategoryRow(category, articles))}
      </section>
    );
  };

  renderHeader = () => {
    return (
      <nav>
        {["近期文章" /** , "分类"*/].map(c =>
          (
            <span
              className={classNames(styles.item, styles.mobile)}
              onClick={() => this.setState({showSearchResultModal: true})}
              key={c}
            >
              {c}
            </span>
          )
        )}
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
          {this.renderPosts(articles.all)}
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

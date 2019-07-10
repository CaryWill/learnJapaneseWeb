import React, { useEffect } from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { updatePosts, updateCurrentReadPostId } from "../../actions";

const { Search } = Input;
class Sidebar extends React.Component {
  componentDidMount() {
    this.props.dispatch(updatePosts());
  }
  
  render(){
    return (
    <div className={styles.sidebar}>
      <div className={styles.logoBox}>
        <img
          src={`${process.env.PUBLIC_URL}/icon.png`}
          alt="icon"
          className={styles.logo}
        />
        <span>こんにちは。</span>
      </div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value => console.log(value)}
      />
      <section className={styles.recentPosts}>
        <span className={styles.recentPostsHeader}>近期文章</span>
        {this.props.posts.all.slice(0, 10).map((p,index) => (
          <div className={styles.postRow} key={p.title}>
            <span
              className={styles.postRowTitle}
            >
              <button onClick={() => {
                this.props.dispatch(updateCurrentReadPostId(p.id));
              }} />
              {p.title}
            </span>
            <span>{p.date}</span>
          </div>
        ))}
      </section>
    </div>
  );
  }
}

export default connect(({ posts }) => ({ posts }))(Sidebar);

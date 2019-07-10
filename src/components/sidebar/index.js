import React, { Component, useEffect } from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { updatePosts } from "../../actions";

const { Search } = Input;

const Sidebar = ({ dispatch }) => {
  useEffect(() => {
    dispatch(updatePosts("music"));
  },[]);
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
    </div>
  );
};

export default connect()(Sidebar);

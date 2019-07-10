import React, { Component } from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";
import { connect } from "react-redux"
import "antd/dist/antd.css";

const { Search } = Input;

export const Sidebar = props => {
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

"use client";

import HomePageFirst from "./components/HomePageFirst";
import HomePageSecond from "./components/HomePageSecond";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HomePageFirst />
      <HomePageSecond />
    </div>
  );
}


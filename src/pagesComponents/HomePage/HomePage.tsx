"use client";

import HomePageFirst from "./components/HomePageFirst";
import HomePageFive from "./components/HomePageFive";
import HomePageFour from "./components/HomePageFour";
import HomePageSecond from "./components/HomePageSecond";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HomePageFirst />
      <HomePageSecond />
      <HomePageFour />
      <HomePageFive />
    </div>
  );
}


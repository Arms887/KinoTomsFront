"use client";

import HomePageFirst from "./components/HomePageFirst";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <HomePageFirst />
    </div>
  );
}


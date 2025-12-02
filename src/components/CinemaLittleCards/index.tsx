import * as React from "react"
import styles from "./cinemaLittleCards.module.scss"


function CinemaLittleCards() {


  return (

      <div className={styles.cinemaLittleCardsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className={styles.cinemaLittleCard} key={index}>
          </div>
        ))}
      </div>
  )
}

export { CinemaLittleCards }

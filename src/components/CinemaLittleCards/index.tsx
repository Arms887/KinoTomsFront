// import * as React from "react"
// import styles from "./cinemaLittleCards.module.scss"
// import { testCinemaArray } from "@/halpers/constants/indext"
// import Image from "next/image"


// function CinemaLittleCards() {


//   return (

//     <div className={styles.cinemaLittleCardsContainer}>
//       {testCinemaArray.map((_, index) => (
//         <div className={styles.cinemaLittleCard} key={index}>
//           <div className={styles.cinemaLittleCardImage}><Image src={_.img} alt={_.title} /></div>
//           <p>{_.title}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export { CinemaLittleCards }


import * as React from "react"
import styles from "./cinemaLittleCards.module.scss"
import { testCinemaArray } from "@/halpers/constants/indext"
import Image from "next/image"
import { useTranslations } from "next-intl"


function CinemaLittleCards() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)
  const t = useTranslations("CinemaLittleCards")
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2 
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={styles.cinemaLittleCardsContainer}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {testCinemaArray.map((_, index) => (
        <div className={styles.cinemaLittleCard} key={index}>
          <div className={styles.cinemaLittleCardImage}>
            <Image src={_.img} alt={_.title} />
          </div>
          <p>{t(_.title)}</p>
        </div>
      ))}
    </div>
  )
}

export { CinemaLittleCards }
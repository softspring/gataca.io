import React, { useState, useEffect } from "react"
import homeData from "../../../content/data/homeData.json"
import styles from "./bigcta.module.scss"
import ctaStyles from "../CtaSection/cta.module.scss"
import { Button } from "carbon-components-react"
import { Link } from "gatsby"

type IBigCtaSectionProps = {}


const BigCtaSection: React.FC<IBigCtaSectionProps> = ({}) => {

  const triggerGAEvent = (event: string) => {

    // @ts-ignore
    if (!window && !!window.datalayer) {
      return;
    }
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      'event': event
    });

  }

  useEffect(() => {

  }, [])

  return (
    <React.Fragment>
      <section className={styles.mainSection}>

        <div className={styles.subContainer}>

          <div className={styles.hero_container_mobile}>
            <div className={styles.circle2}/>
            <div className={styles.circle3}/>
            <div className={styles.circle4}/>
            <div className={styles.circle5}/>
            <div className={styles.gridContainer_mobile}>
              {homeData.newIntroSection.images.map((img, i) => {
                return <div
                  key={i}
                  className={styles.imageContainerMobile}>
                  <img src={img} alt={""}/>
                </div>
              })
              }
            </div>
            {/*<img src={homeData.newIntroSection.image}/>*/}
          </div>

          <div className={styles.textBox}>
            <h1>{homeData.bigCtaSection.title}</h1>
            <h3>{homeData.bigCtaSection.description}</h3>
            {/*<p>{homeData.bigCtaSection.subDescription}</p>*/}
            <Link onClick={() => triggerGAEvent('Home => Products')} to={homeData.bigCtaSection.ctaUrl}>

              <button
                className={styles.ctaButton}
              > {homeData.bigCtaSection.subDescription}</button>
            </Link>
          </div>

          <div className={styles.hero_container}>
            <div className={styles.circleTop}/>
            <div className={styles.circle2}/>
            <div className={styles.circle3}/>
            <div className={styles.circle4}/>
            <div className={styles.circle5}/>
            <div className={styles.gridContainer}>
              {homeData.newIntroSection.images.map((img, i) => {
                return <div key={i} className={styles.imageContainer}>
                  <img src={img} alt={""}/>
                </div>
              })
              }
            </div>
            {/*<img src={homeData.newIntroSection.image}/>*/}
          </div>
        </div>

      </section>
    </React.Fragment>
  )
}

BigCtaSection.defaultProps = {}

export default BigCtaSection

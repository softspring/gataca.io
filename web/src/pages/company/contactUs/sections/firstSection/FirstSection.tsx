import * as React from "react"
import cx from "classnames"
import { images } from "../../../../../images/images"
import * as styles from "./firstSection.module.scss"
import HubspotForm from "react-hubspot-form"
import FormSkeleton from "./components/FormSkeleton"

export type ISectionProps = {
  title: string
  description: string
  list: {
    title: string
  }[]
}

const icons = [
  images.desktopIcon,
  images.searchIcon,
  images.puzzleIcon,
  images.videoPlayIcon,
]
const FirstSection: React.FC<ISectionProps> = props => {
  const { title, description, list } = props
  const [formSubmitted, setFormSubmitted] = React.useState(false)

  return (
    <section className={`${styles.firstSection} ${cx("containerMaxWidth")}`}>
      <div className={styles.firstSection__container}>
        <div className={styles.firstSection__leftSide}>
          <h1 className={`${cx("heading1 marginBottom32")}`}>{title}</h1>
          <p
            className={`${cx("bodyRegularXL neutral700")} ${
              styles.description
            }`}
          >
            {description}
          </p>
          {list?.map((item, index) => {
            const { title } = item
            return (
              <div
                className={`${styles.list__container} ${cx("marginBottom24")}`}
              >
                <img src={icons[index]} />
                <p
                  key={"item__" + index}
                  className={`${cx("bodyRegularXL neutral700")}`}
                >
                  {title}
                </p>
              </div>
            )
          })}
        </div>
        <div className={styles.firstSection__rightSide}>
          <div id="formContainer" className={styles.form_container}>
            <HubspotForm
              region="na1"
              portalId="4728390"
              formId="b7c7e863-372f-4ff1-a529-8a30c37913cc"
              onSubmit={() => {
                setFormSubmitted(true)
                console.log("Submit!")
              }}
              onReady={() => {
                console.log("ready")
              }}
              loading={<FormSkeleton />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirstSection

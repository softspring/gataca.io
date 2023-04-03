import * as React from "react"
import cx from "classnames"
import * as styles from "./useCasesSection.module.scss"
import { images } from "../../../../images/images"
import ListItems from "../../components/listItems/ListItems"

export type ISectionProps = {
  title: string
  description: string
  list: {
    title: string
    description: string
    image: string
  }[]
}

const UseCasesSection: React.FC<ISectionProps> = props => {
  const { title, description, list } = props
  const [openItem, setOpenItem] = React.useState<number>(1)

  const useCasesBullets = document.getElementById("useCasesBullets")

  const scrollIntoView = el => {
    useCasesBullets
      ? useCasesBullets.scroll({
          behavior: "smooth",
          left: el.offsetLeft,
        })
      : null
  }

  return (
    <>
      <section
        className={`${styles?.useCasesSection} ${cx("containerMaxWidth")}`}
      >
        <div className={styles?.useCasesSection__leftColumn}>
          <h3 className={cx("heading3 marginBottom12")}>{title}</h3>
          <p className={cx("bodyRegularXL")}>{description}</p>
          <div className={styles?.showDesktop}>
            <img src={images.folderPurple} alt="Folder" />
          </div>
        </div>
        <div
          id="useCasesBullets"
          className={styles.useCasesSection__rightColumn}
        >
          {list?.map((item, index) => {
            const { title, description } = item

            return (
              <ListItems
                id={"listItem__" + index}
                key={"listItem__" + index}
                index={index + 1}
                title={title}
                description={description}
                selected={openItem === index + 1}
                showItem={index => {
                  const element = document.getElementById(
                    "listItem__" + (index - 1)
                  )
                  setOpenItem(index), element && scrollIntoView(element)
                }}
              />
            )
          })}
        </div>
        <div className={styles?.showMobile}>
          <img src={images.folderPurple} alt="Folder" />
        </div>
      </section>
    </>
  )
}

export default UseCasesSection

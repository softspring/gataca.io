import * as React from "react"
import cx from "classnames"
import LicenseCard from "../../components/licenseCard/LicenseCard"
import SwitchButton from "../../../../components/atoms/buttons/switchButton/SwicthButton"
import LicensesTableMobile from "../../components/licensesTableMobile/LicensesTableMobile"
import LicensesTable from "../../components/licensesTable/LicensesTable"
import PurpleButton from "../../../../components/atoms/buttons/purple/PurpleButton"
import {
  ButtonModel,
  IProductModel,
  InfoTogglesPricingModel,
} from "../../../../interfaces/interfaces"
import OnPremisePanel from "../../components/onPremisePanel/OnPremisePanel"
import Categories from "../../components/categories/Categories"
import CrevronDownSVG from "../../../../images/icons/ChevronDownSVG"
import ChevronUpSVG from "../../../../images/icons/ChevronUpSVG"
import * as styles from "./firstSection.module.scss"

export type ISectionProps = {
  title: string
  description: string
  index: number
  categories: {
    id: string
    title: string
  }[]
  onPremise: {
    panelTitle: string
    paragraphs: string[]
    button: ButtonModel
  }
  licenses: IProductModel[]
  infoToggles: InfoTogglesPricingModel
}

const FirstSection: React.FC<ISectionProps> = props => {
  const {
    title,
    description,
    index,
    categories,
    licenses,
    onPremise,
    infoToggles,
  } = props
  const [switchPeriodValue, setmonthlyChecked] = React.useState("month")
  const [showAllFeatures, setShowAllFeatures] = React.useState(false)
  const [selectedLicense, setSelectedLicense] = React.useState(0)

  const selectPeriod = (period: string) => {
    setmonthlyChecked(period)
  }

  const switchButton = {
    options: [
      { text: "", value: "month" },
      { text: "Pay Yearly (Save 10%)", value: "year" },
    ],
    function: selectPeriod,
  }

  const [openItem, setOpenItem] = React.useState<number>(1)
  let typeCategories: HTMLElement | null

  React.useEffect(() => {
    typeCategories = document && document?.getElementById("cloud")
  })

  const scrollIntoView = (el: any) => {
    typeCategories
      ? typeCategories.scroll({
          behavior: "smooth",
          left: el.offsetLeft,
        })
      : null
  }

  return (
    <>
      <section className={`${styles?.firstSection} ${cx("containerMaxWidth")}`}>
        <div className={styles?.firstSection__header}>
          <h1 className={cx("heading2 marginBottom32")}>{title}</h1>
          <p className={cx("bodyRegularXL marginBottom32")}>{description}</p>
          <div className={styles?.categories}>
            {categories?.map((item, index) => {
              const { title } = item
              return (
                <Categories
                  id={"categories__" + item?.id + index}
                  key={"categoriesP__" + index}
                  index={index + 1}
                  title={title}
                  selected={openItem === index + 1}
                  showItem={index => {
                    const element =
                      document &&
                      document?.getElementById("listCategory__" + (index - 1))
                    setOpenItem(index), element && scrollIntoView(element)
                  }}
                />
              )
            })}
          </div>
        </div>
        <div id="cloud" className={styles?.firstSection__sectors}>
          {openItem === 1 ? (
            <>
              <div className={styles?.switchButtonContainer}>
                <SwitchButton
                  rightLabel={"Pay Yearly (Save 10%)"}
                  checkedValue={switchPeriodValue}
                  options={switchButton.options}
                  onChangeSwitchSelect={switchButton.function}
                />
              </div>
              <div className={styles?.firstSection__sectors__cardsContainer}>
                {licenses?.map((item: any, index) => {
                  return (
                    <>
                      <LicenseCard
                        key={"licenseP__" + item?.type + index}
                        license={item}
                        period={switchPeriodValue}
                        isCurrentLicense={false}
                      />
                    </>
                  )
                })}
              </div>

              {showAllFeatures && (
                <div id={"allFeatures"}>
                  <LicensesTable
                    products={licenses}
                    switchPeriodValue={switchPeriodValue}
                    infoToggles={infoToggles}
                  />
                  <LicensesTableMobile
                    licenseIndex={selectedLicense}
                    license={licenses[selectedLicense]}
                    switchPeriodValue={switchPeriodValue}
                    infoToggles={infoToggles}
                    selectLicense={setSelectedLicense}
                  />
                </div>
              )}
              <PurpleButton
                label={
                  showAllFeatures ? "Hide all features" : "See all features"
                }
                outlined
                IconComponent={
                  showAllFeatures ? <ChevronUpSVG /> : <CrevronDownSVG />
                }
                className={`${cx("marginTop32")} ${styles?.allFeaturesButton}`}
                action={() => {
                  setShowAllFeatures(!showAllFeatures),
                    setSelectedLicense(0),
                    document
                      ?.getElementById("allFeatures")
                      ?.scrollIntoView(true)
                }}
              />
            </>
          ) : (
            <OnPremisePanel
              panelTitle={onPremise?.panelTitle}
              paragraphs={onPremise?.paragraphs}
              button={onPremise?.button}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default FirstSection

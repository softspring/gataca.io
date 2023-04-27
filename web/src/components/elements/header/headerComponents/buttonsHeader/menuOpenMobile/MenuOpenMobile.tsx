import { Link } from "gatsby"
import * as React from "react"
import * as styles from "./menuOpenMobile.module.scss"
import { images } from "../../../../../../images/images"
import { headerMenuOptions } from "../../../../../../data/globalData"
import MenuDropdownMobile from "../../menuDropdownMobile/MenuDropdownMobile"
import ButtonsHeader from "../ButtonsHeader"

export type IMenuDropdownProps = {
  open: string
  setMenuOpened: (x: string) => void
}

const MenuOpenMobile: React.FC<IMenuDropdownProps> = props => {
  const { open, setMenuOpened } = props
  const [subMenuOpenedID, setSubMenuOpened] = React.useState("")

  return (
    <div className={styles.mobileMenu}>
      <div onClick={() => setMenuOpened(!open)}>
        <img src={open ? images.closeMenuIcon : images.menuIcon}></img>
      </div>
      {open && (
        <>
          <div className={styles.mobileMenu__Content}>
            <div>
              {headerMenuOptions?.map((item, index) => {
                return (
                  <MenuDropdownMobile
                    key={"menuDropdown__" + index}
                    open={subMenuOpenedID === item?.id}
                    item={item}
                    setOptionOpened={setSubMenuOpened}
                  />
                )
              })}
            </div>
            <div className={styles.buttonsContainer}>
              <ButtonsHeader />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MenuOpenMobile

import * as React from "react"
import * as styles from "./tableOfContentContainer.module.scss"
import { LinkModel } from "../../../../../interfaces/interfaces"
import { images } from "../../../../../images/images"
import TableOfContentOptions from "../tableOfContentOptions/TableOfContentOptions"

export type ITableOfContentProps = {
  item: LinkModel
  className?: string
  open: boolean
  setOptionOpened: (x: string) => void
}
const TableOfContentHeader: React.FC<ITableOfContentProps> = props => {
  const { item, className, open, setOptionOpened } = props

  return item?.route ? null : (
    <div
      className={`${styles?.sectionMain__tableContentCol} ${
        className && className
      }`}
      onClick={() => setOptionOpened(!open ? item?.id : "")}
    >
      <div id={item?.id} className={styles?.title}>
        <div className={styles?.title}>
          <div>
            <span>{item?.label}</span>
            <img src={images.chevronUp} />
          </div>
        </div>
        <TableOfContentOptions item={item} open={open} />
      </div>
    </div>
  )
}

export default TableOfContentHeader

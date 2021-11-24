import React, { Fragment, useState, useCallback, useEffect } from "react"
import { Link } from "gatsby"
import headerStyles from "./header.module.scss"
import logo from "@images/logo.svg"
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer"
import configMetaData from "./../../../content/data/configMetaData.json"
import companyData from "./../../../content/data/companyData.json"
import productsData from "./../../../content/data/productsData.json"
import useCasesData from "./../../../content/data/useCasesData.json"
import developersData from "./../../../content/data/developersData.json"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { Location } from "@reach/router"

import {
  Header,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react/lib/components/UIShell"
import HoverMenu from "../HoverMenu/HoverMenu"
import cx from "classnames"

export default function HeaderSection(props) {
  const [isTopBarOpaque, setisTopBarOpaque] = useState(false)
  const [hoverList, setHoverList] = useState({
    products: false,
    useCases: false,
    developers: false,
    company: false,
  })
  
  const hoverElement = (element) => {
    let reset = {
      products: false,
      useCases: false,
      developers: false,
      company: false,
    }
    if (element) {
      reset[element] = !hoverList[element]
    }
    // console.log("HoverElement => ", element, !hoverList[element])
    setHoverList(reset)
  }
  
  const changeHoverVisibility = useCallback(
    (element) => {
      if (hoverList[element]) {
        return
      }
      
      let reset = {
        products: false,
        useCases: false,
        developers: false,
        company: false,
      }
      reset[element] = !hoverList[element]
      // console.log("ChangeHoverVisibility", element, !hoverList[element])
      setHoverList(reset)
    },
  )
  
  const menuList = [
    {
      name: "Products",
      id: "products",
      route: "products",
      list: productsData.products,
    },
    {
      name: "Sectors",
      id: "useCases",
      route: "use-cases",
      list: useCasesData.list,
    },
    {
      name: "Developers",
      id: "developers",
      route: "developers",
      list: developersData.content,
    },
    {
      name: "Blog",
      id: "blog",
      route: "blog",
    },
    {
      name: "Company",
      id: "company",
      route: "company/about",
      list: companyData.content,
    },
  ]
  
  useScrollPosition(
    ({ prevPos, currPos }) => {
      // console.log("CURRENT => ", currPos)
      // console.log("PREV => ", prevPos)
      const isShow = currPos.y < -300
      // console.log(isShow)
      // if (isShow !== hideOnScroll) setHideOnScroll(isShow)
      setisTopBarOpaque(isShow)
    },
    [],
    false,
    false,
    300,
  )
  
  useEffect(() => {
    return () => {
    }
  }, [props.location])
  
  return (
    <Location>{
      locationProps => {
        const path = locationProps.location.pathname && locationProps.location.pathname.split('/').includes('blog');
        return <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Fragment>
              <Header aria-label="Open menu" className={cx(
                headerStyles.header,
                path && headerStyles.headerBlog
              )}>
                
                <div className={cx(
                  headerStyles.nav,
                  path ? headerStyles.navSolid :
                    isTopBarOpaque ? headerStyles.navOpaque :
                      null, isSideNavExpanded && headerStyles.navMobileOpen
                )}>
                  
                  <div className={headerStyles.left}>
                    <Link to="/">
                      <img src={logo} alt={"Gataca"}/>
                      <h2>{props.title}</h2>
                    </Link>
                  </div>
                  
                  <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                  />
                  
                  <div className={headerStyles.center}>
                    {menuList.map(el => {
                      return <div
                        key={el.id}
                        className={headerStyles.productsMenu}
                        onMouseEnter={() => {
                          hoverElement(el.id)
                        }}
                        onMouseLeave={() => {
                          hoverElement()
                        }}
                      >
                        <Link
                          to={el.route ? "/" + el.route + "/" : null}
                        >
                          <p>
                            {el.name}
                          </p>
                        </Link>
                        
                        {
                          el.list && <HoverMenu
                            isBlog={path}
                            isOpaque={isTopBarOpaque}
                            isVisible={hoverList[el.id]}
                            hoverElement={el.id}
                            changeVisibility={changeHoverVisibility}
                            list={el.list}/>
                        }
                      </div>
                    })}
                  
                  </div>
                  <div className={headerStyles.right}>
                    {/*                <a>
                  <p>
                  
                  </p>
                </a>*/}
                    <Link to={configMetaData.bookACallUrl}>
                      <h3 className={headerStyles.header__cta}>
                        Get in touch
                      </h3>
                    </Link>
                  </div>
                </div>
                
                <SideNav
                  className={headerStyles.sideNav}
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}>
                  <SideNavItems>
                    <SideNavLink
                      href={configMetaData.bookACallUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className={headerStyles.cta}>
                      Get in touch
                      </p>
                    </SideNavLink>
                    
                    <div className={headerStyles.sideNavDivider}/>
                    
                    
                    <SideNavLink className={headerStyles.sideNavHeadline} href="/products">
                      Products
                    </SideNavLink>
                    <SideNavLink href="/products/certify">
                      Certify
                    </SideNavLink>
                    <SideNavLink href="/products/connect">
                      Connect
                    </SideNavLink>
                    <SideNavLink href="/products/wallet">
                      Wallet
                    </SideNavLink>
                    
                    <div className={headerStyles.sideNavDivider}/>
  
                    <SideNavLink className={headerStyles.sideNavHeadline} href="/use-cases">
                      Sectors
                    </SideNavLink>
  
                    <SideNavLink href="/use-cases/government">
                      Government
                    </SideNavLink>
                    <SideNavLink href="/use-cases/education">
                      Education
                    </SideNavLink>
                    <div className={headerStyles.sideNavDivider}/>
                    
                    <SideNavLink href="/blog/">
                      Blog
                    </SideNavLink>
                    <SideNavLink href="/company/about/">
                      About
                    </SideNavLink>
                    <SideNavLink href="/company/press/">
                      Press
                    </SideNavLink>
                  
                  </SideNavItems>
                
                </SideNav>
              
              </Header>
            </Fragment>
          )}
        />
      }
    }
    </Location>
  )
}

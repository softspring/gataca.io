import partnersStyles  from "./partners.module.scss"
import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"

function renderPartners({ data, info }) {
  // filter Query to get to data
  data = data.allDataJson.nodes.filter(node => {return node ? !!node.partnersSection : null})
  const partnersData = data[0].partnersSection;
  
  return (
    <section className={`${partnersStyles.base}`}>
      <div className={`bx--grid ${partnersStyles.container}`}>
        <div className={`bx--row`} >
          <div className={`bx--col-lg-4 bx--col-md-16 ${partnersStyles.introText}`} >
            <p>{partnersData.title}</p>
          </div>
          {partnersData.partners.map(el=>{
            return (
              <div className={`bx--col-lg-3 bx--col-md-2 bx--col-sm-2 ${partnersStyles.partnerContainer}`}>
                <img src={el.image.publicURL} alt={el.title}/>
              </div>
            )
          })}`
        </div>
    </div>
    </section>
  )
}

export default function Partners({ info }) {
    return (
      <StaticQuery
        query={
          graphql`
              query PartnersQuery {
                  allDataJson {
                        nodes {
                            partnersSection {
                                title
                                partners {
                                    title
                                    image {
                                        publicURL
                                        relativePath
                                    }
                                }
                            }
                        }
                  }
              }
      `}
      render={data => renderPartners({ data, info })}/>
    )
}

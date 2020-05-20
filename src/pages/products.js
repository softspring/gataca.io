import React from "react"
import Layout from "../layouts/Layout"
import productStyles from "../styles/pages/products.module.scss"
import useSiteMetaData from "../static_queries/useSiteMetadata"
import productsData  from "./../../content/data/productsData.json"
import faqData  from "./../../content/data/faqData.json"
import ProductsSelector from "../components/ProductsSection/ProductsSelector"
import BulletCenter from "../components/BulletCenter"
import FaqSection from "../components/faqSection/FaqSection"

function IntroSection(props) {
  return (
    <section className={productStyles.introContainer}>
      <div>
        <h2>{props.data.title}</h2>
        <p>{props.data.description}</p>
      </div>
    </section>
  )
}

export default function Products(props) {
  const { infoData } = useSiteMetaData()
  console.log('PRODUCTS PAGE DATA => ',props.data);
  return (
    <Layout>
      <section className={productStyles.base}>
        <IntroSection data={productsData.introProductsSection}/>
        <ProductsSelector data={productsData.productsData}/>
        <BulletCenter data={productsData.endBullet}/>
        <FaqSection data={faqData.faqSection}/>
      </section>
    </Layout>
  )
}

export const query = graphql`
    query productsPage {
        allDataJson(filter: {}) {
            nodes {
                introProductsSection {
                    title
                    description
                }
#                productsData {
#                    title
#                    icon
#                    description
#                    mainImage
#                    bullets {
#                        title
#                        image
#                        description
#                    }
#                }
#                faqSection {
#                    title
#                    icon
#                    questions {
#                        title
#                        response
#                    }
#                }
            }
        }
    }
`

import React, { Fragment } from "react"
import Layout from "./../layouts/Layout"
import { graphql } from "gatsby"
// import useBlogData from "../static_queries/useMdBlogData"
import blogTemplateStyles from "../styles/templates/blog.module.scss"
//this component handles the blur img & fade-ins
import Img from "gatsby-image"
import { BuildHelmet } from "../components/auxiliary/HelmetBuilder"
import cx from "classnames"

const definedSlug = "decentralized-finance-self-sovereign-identity-a-tale-of-decentralization-a-new-paradigm-of-trust"

function buildHeroImage(frontmatter, slug) {
  const heroImage = frontmatter.hero_image
  return !!heroImage ? (
    <figure className={cx(
      slug === definedSlug ? blogTemplateStyles.blog__hero_bottom : blogTemplateStyles.blog__hero,
)}>
      <Img
        fluid={frontmatter.hero_image.childImageSharp.fluid}
        alt={frontmatter.title}
      />
    </figure>
  ) : (
    <Fragment />
  )
}

export default function BlogMd(props) {
  const data = props.data.markdownRemark

  function passImageIfExist(image) {
    // console.log(image)
    return !!image ? image.publicURL : null
  }

  return (
    <Layout>
      <BuildHelmet
        title={data.frontmatter.meta_data.title}
        description={data.frontmatter.meta_data.description}
        facebookImg={passImageIfExist(
          data.frontmatter.meta_data.rrss_images.facebook_and_whatsapp
        )}
        linkedInImg={passImageIfExist(
          data.frontmatter.meta_data.rrss_images.linkedin
        )}
        twitterImg={passImageIfExist(
          data.frontmatter.meta_data.rrss_images.twitter
        )}
      />
      <article className={blogTemplateStyles.blog}>
        {/*HERO IMAGE*/}
        {buildHeroImage(data.frontmatter, data.fields.slug)}
        <div className={blogTemplateStyles.blog__info}>
          <h1>{data.frontmatter.title}</h1>
        </div>
        <div
          className={blogTemplateStyles.blog__body}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />

        {/*<div className={blogTemplateStyles.blog__footer}>
          <h2>
            Written By: {data.frontmatter.author}
          </h2>
          <Link to={`blog/${nextSlug}`} className={blogTemplateStyles.footer__next}>
            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26" >
              <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713  C23.411,13.317,23.411,12.685,23.021,12.294z"/>
            </svg>
          </Link>
        </div>*/}
      </article>
    </Layout>
  )
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
        meta_data {
          description
          title
          rrss_images {
            facebook_and_whatsapp {
              publicURL
            }
            linkedin {
              publicURL
            }
            twitter {
              publicURL
            }
          }
        }
      }
      html
    }
  }
`

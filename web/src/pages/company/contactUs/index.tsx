import type { PageProps } from "gatsby"
import * as React from "react"
import Layout from "../../../components/templates/mainLayout/MainLayout"
import BeforeFooterCTASection from "../../../components/templates/sections/beforeFooterCTA/BeforeFooterCTA"
import { navigate } from "gatsby"
import { gatacaStudioURL } from "../../../globalData/globalData"

const ContactUsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <>
        <main>
          <h1>Contact us</h1>
        </main>
        <BeforeFooterCTASection
          title={"Ready to start?"}
          description={
            "Create an account in Gataca Studio and start experiencing decentralized identity today. Fast & seamless integration"
          }
          leftButton={{
            label: "See pricing plans",
            // TODO: Add navigation for pricing
            action: () => console.log("hola"),
          }}
          rightButton={{
            label: "Try for free",
            action: () => window.open(gatacaStudioURL, "_blank"),
          }}
        />
      </>
    </Layout>
  )
}

export default ContactUsPage

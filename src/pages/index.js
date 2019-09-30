import React from "react"
import Nav from "../components/nav/index";
import Featured from "../components/featured";
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav />
    <Featured />
  </Layout>
)

export default IndexPage

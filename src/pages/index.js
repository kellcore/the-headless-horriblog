import React from "react";
import { Link } from 'gatsby';
import Nav from "../components/nav/index";
import Featured from "../components/featured";
import Layout from "../components/layout";
import Home from "../components/home";
import Footer from '../components/footer';
import SEO from "../components/seo";
import './index.css';


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav />
    <Featured />
    <Home />
    <Link to="/blog" className="view_more"> View More </Link>
    <Footer />
  </Layout>
)

export default IndexPage

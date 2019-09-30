import React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import './featured.css';
// StaticQuery -> allows you to call data from inside a specific component and you can pass those components wherever you'd like
// ex. Featured and Home can each have their own graphQL components and then we can plug those into the Home page, but the Home page itself doesn't need any graphQL

// each query needs a specific name -> ex. FeaturedQuery
// allContentfulBlog calls all of the blogs in our Contentful CMS
// limit: 1 only returns one thing
// edges is returning all the blogs
// node is the individual blog
// if you call fluid inside the graphQL, Gatsby will recognize this as a fluid image

export default () => (
    <StaticQuery
        query={graphql`
        query FeaturedQuery {
            allContentfulBlog (
                limit: 1
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US",}
                    featured: {eq: true}
                }
            ) {
                edges {
                    node {
                        id
                        slug
                        title
                        shortDescription
                        featuredImage {
                            fluid(maxWidth: 1200, quality: 85) {
                                src
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                }
            }
        }
    `}
        render={data => (
            // now we're rendering the data we called above with graphQL into the actial component
            <header>
                {data.allContentfulBlog.edges.map(edge => (
                    <div key={edge.node.id} className='header_section'>
                        <div className="header_hero" style={{ backgroundImage: `url(${edge.node.featuredImage.fluid.src})` }}></div>
                        <div className="header_content">
                            <div className="header_info">
                                <h1 className="header_title"> {edge.node.title} </h1>
                                <p className="header_subtitle"> {edge.node.shortDescription}</p>
                                <button onClick={() => navigate(`/blog/${edge.node.slug}`)} className="btn_med"> Read More </button>
                            </div>
                        </div>
                    </div>
                ))}
            </header>
        )}
    />
)
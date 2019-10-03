import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SEO from '../components/seo';
import '../components/home/home.css';
import './archive.css';

import headerImg from '../images/mario-azzi-DY2miYwMchk-unsplash.jpg';

const Archive = (props) => {
    const blogContent = props.data.allContentfulBlog;
    const { currentPage, numOfPages } = props.pageContext;
    // this comes from gatsby-node!
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === numOfPages;
    const previousPage = currentPage - 1 === 1 ? '/blog' : `/blog${currentPage - 1}`;
    // does the current page - 1 equal 1? if so, direct to blog, otherwise, direct to blog/2 etc.
    const nextPage = `/blog/${currentPage + 1}`;

    return (
        <Layout>
            <SEO title='Blog' keywords={['halloween', 'horror blog', 'horror movies']} />
            <Nav />

            <header>
                <div className='archive_section'>
                    <div className='archive_hero' style={{ backgroundImage: `url(${headerImg})` }}>
                    </div>
                    <div className="archive_nav">
                        <Link to='/blog' className={window.location.href.indexOf('/blog') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Blog </Link>
                        <Link to='/category/contemporary-block' className={window.location.href.indexOf('category/contemporary-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Contemporary Block </Link>
                        <Link to='/category/un-block' className={window.location.href.indexOf('category/un-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Un Block </Link>
                        <Link to='/category/vampire-block' className={window.location.href.indexOf('category/vampire-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Vampire Block </Link>
                        <Link to='/category/awful-block' className={window.location.href.indexOf('category/awful-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Awful Block </Link>
                        <Link to='/category/slasher-block' className={window.location.href.indexOf('category/slasher-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Slasher Block </Link>
                        <Link to='/category/japanese-block' className={window.location.href.indexOf('category/japanese-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Japanese Block </Link>
                        <Link to='/category/stephen-king-block' className={window.location.href.indexOf('category/stephen-king-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Stephen King Block </Link>
                        <Link to='/category/john-carpenter-block' className={window.location.href.indexOf('category/john-carpenter-block') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> John Carpenter Block </Link>
                        <Link to='/category/other' className={window.location.href.indexOf('category/other') > 0 ? 'archive_nav_link selected' : 'archive_nav_link'}> Other </Link>
                    </div>
                </div>
            </header>

            <div className='feed'>
                {blogContent.edges.map(edge => (
                    <div key={edge.node.id} className='card'
                        style={{
                            backgroundImage: `linear-gradient(
                            to bottom,
                            rgba(10, 10, 10, 0) 0%,
                            rgba(10, 10, 10, 0) 50%,
                            rgba(10, 10, 10, 0.7) 100%),
                            url(${edge.node.featuredImage.fluid.src})`
                        }}
                        onClick={() => navigate(`/blog/${edge.node.slug}`)}
                    >
                        {edge.node.category.map(category => (
                            <p className='card_category'>{category.title}</p>
                        ))}
                        <p className="card_title">
                            {edge.node.title}
                        </p>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <div className='pagination_item'>
                    {!isFirstPage && (
                        <Link to={previousPage} rel="previous">
                            <div className="arrow_back">
                            </div>
                        </Link>
                    )}
                    {/* if this is not the first page and true, we display an arrow back */}
                </div>
                <div className='pagination_item'>
                    {!isLastPage && (
                        <Link to={nextPage} rel="next">
                            <div className="arrow_next">
                            </div>
                        </Link>
                    )}
                    {/* if this is not the last page and true, we display an arrow forward */}
                </div>
            </div>
        </Layout>
    )
}

export default Archive;

export const pageQuery = graphql`
    query ArchiveQuery ($skip: Int!, $limit: Int!) {
        allContentfulBlog(
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}
            }
            skip: $skip
            limit: $limit
        ) {
            edges {
                node {
                    id
                    slug
                    title
                    createdAt
                    category {
                        title
                        id
                    }
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
`
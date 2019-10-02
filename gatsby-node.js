const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
    // query for nodes to use in creating pages
    resolve(
        graphql(request).then(result => {
            if (result.errors) {
                reject(result.errors)
            }
            return result;
        })
    )
});

// implement the Gatsby API "createPages" -> this is called once the data layer is bootstrapped to let plugins create pages from data

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    // create pages for each blog
    const getBlog = makeRequest(graphql, `
    {
        allContentfulBlog(
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}
            },
        )
        {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`).then(result => {
        result.data.allContentfulBlog.edges.forEach(({ node }) => {
            createPage({
                path: `blog/${node.slug}`,
                component: path.resolve(`src/templates/blog.js`),
                context: {
                    id: node.id
                },
            })
        })
    });
    //create archive page for all blogs (including pagination)
    const getArchive = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                },
            )
            {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `).then(result => {
        const blogs = result.data.allContentfulBlog.edges;
        const blogsPerPage = 9;
        // calculate how many pages we actually need
        const numOfPages = Math.ceil(blogs.length / blogsPerPage);

        Array.from({ length: numOfPages }).forEach((_, i) => {
            // for each value that is in the array, create a page for it using the createPage API
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/archive.js"),
                // we need to tell it where to pull in the template
                context: {
                    // context allows us to pass the data into the component so we can use it in the graphql query
                    limit: blogsPerPage,
                    skip: i * blogsPerPage,
                    // skip will allow us to go past the first 9 things when this query is called
                    numOfPages,
                    currentPage: i + 1
                }
            })
        })
    });

    return Promise.all([
        getBlog,
        getArchive
    ]);
};

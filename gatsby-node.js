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
                    id: node.id,
                },
            })
        })
    })
    return Promise.all([
        getBlog
    ]);
};

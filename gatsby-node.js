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

    // create contemporary block category page (including pagination)
    const getContemporaryBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Contemporary Block"}}}
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
                path: i === 0 ? `/category/contemporary-block` : `category/contemporary-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/contemporary-block.js"),
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

    // create un block category page (including pagination)
    const getUnBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Un Block"}}}
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
                path: i === 0 ? `/category/un-block` : `category/un-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/un-block.js"),
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

    // create vampire block category page (including pagination)
    const getVampireBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Vampire Block"}}}
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
                path: i === 0 ? `/category/vampire-block` : `category/vampire-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/vampire-block.js"),
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

    // create awful block category page (including pagination)
    const getAwfulBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Awful Block"}}}
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
                path: i === 0 ? `/category/awful-block` : `category/awful-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/awful-block.js"),
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

    // create slasher block category page (including pagination)
    const getSlasherBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Slasher Block"}}}
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
                path: i === 0 ? `/category/slasher-block` : `category/slasher-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/slasher-block.js"),
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

    // create japanese block category page (including pagination)
    const getJapaneseBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Japanese Block"}}}
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
                path: i === 0 ? `/category/japanese-block` : `category/japanese-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/japanese-block.js"),
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

    // create stephen king block category page (including pagination)
    const getStephenKingBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "Stephen King Block"}}}
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
                path: i === 0 ? `/category/stephen-king-block` : `category/stephen-king-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/stephen-king-block.js"),
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

    // create john carpenter block category page (including pagination)
    const getJohnCarpenterBlock = makeRequest(graphql, `
        {
            allContentfulBlog(
                sort: { fields: [createdAt], order: DESC }
                filter: {
                    node_locale: {eq: "en-US"}
                    category: {elemMatch: {title: {eq: "John Carpenter Block"}}}
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
                path: i === 0 ? `/category/john-carpenter-block` : `category/john-carpenter-block/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/john-carpenter-block.js"),
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

    // create other category page (including pagination)
    const getOther = makeRequest(graphql, `
     {
         allContentfulBlog(
             sort: { fields: [createdAt], order: DESC }
             filter: {
                 node_locale: {eq: "en-US"}
                 category: {elemMatch: {title: {eq: "Other"}}}
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
                path: i === 0 ? `/category/other` : `category/other/${i + 1}`,
                // is this the first thing? if so, set url path to /blog, otherwise, we look at the actual position of what's in the array -> add 1 to the value of i
                // ex. blog/2
                component: path.resolve("./src/templates/other.js"),
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
        getArchive,
        getContemporaryBlock,
        getUnBlock,
        getVampireBlock,
        getAwfulBlock,
        getSlasherBlock,
        getJapaneseBlock,
        getStephenKingBlock,
        getJohnCarpenterBlock,
        getOther
    ]);
};

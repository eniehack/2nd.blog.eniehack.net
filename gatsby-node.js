/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// https://crieit.net/posts/GatsbyJS-Markdown-5c465795f18c3
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
			const blogPost = path.resolve(`./src/templates/detail.js`);
			const listedPostSameTags = path.resolve(`./src/templates/listedPostsOnSameTags.js`);
			resolve(
				graphql(
					`{
						getSlug: allAsciidoc {
							edges {
								node {
									fields {
										slug
									}
								}
							}
						}
						getTags: allAsciidoc {
							edges {
								node {
									frontmatter {
										tags
									}
								}
							}
						}
					}`
				).then(result =>{
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}

					const posts = result.data.getSlug.edges;
          const tags = result.data.getTags.edges;

					posts.forEach((post) => {
						createPage({
							path: post.node.fields.slug,
							component: blogPost,
							context: {
								slug: post.node.fields.slug,
							}
						});
					});
          tags.forEach((edge) => {
						const tags = edge.node.frontmatter.tags;
						tags.forEach((tag) => {
							createPage({
								path: `/tags/${tag}`,
								component: listedPostSameTags,
								context: {
									tag: tag,
								}
							});
						});
          });
				})
			);
		});
}

// http://danilowoz.com/Advanced-blog-system-in-Gatsby/
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Asciidoc`) {
		const value = createFilePath({ node, getNode })
		const url = `/posts${value}`;

    createNodeField({
      node,
      name: `slug`,
      value: url,
    })
  }
}

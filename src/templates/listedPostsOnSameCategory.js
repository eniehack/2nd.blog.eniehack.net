import React from "react";
import { Link, graphql } from "gatsby";
import { Tag } from "antd";
import { mdiFolder, mdiTag, mdiCalendar } from "@mdi/js";
import { Icon } from "@mdi/react";

import SEO from "../components/seo";
import Layout from "../components/layout";

export const ListedSameCategoryTemplate = ({ data, pageContext }) => {
		const article = data.allAsciidoc.edges;
		const { category } = pageContext;
    return (
        <Layout>
          <SEO title={`Category: ${category}`} />
          <article>
            <h1 itemProp="name">
              {`Category: ${category}`}
            </h1>
						{
							article.map((edges, index) => {
                return (
                  <section key={index}>
                    <h2>
											<Link to={edges.node.fields.slug}>
												{edges.node.document.title}
											</Link>
										</h2>
										<div>
											<div>
												<Icon
													path={mdiCalendar}
													size={0.75}
												/>
												<time>{edges.node.revision.date}</time>
											</div>
											<div>
												<Icon
													path={mdiTag}
													size={0.75}
												/>
												{
													edges.node.frontmatter.tags.map((tag, tagsindex) => {
														return (
															<Tag key={tagsindex}>
																<Link to={`/tags/${tag}`}>
																	{tag}
																</Link>
															</Tag>
														)
													})
												}
											</div>
											<div>
												<Icon
													path={mdiFolder}
													size={0.75}
												/>
												<Tag>
													<Link to={`/categories/${edges.node.frontmatter.category}`}>
														{edges.node.frontmatter.category}
													</Link>
												</Tag>
											</div>
										</div>
                  </section>
                )
            	})
						}
					</article>
        </Layout>
    )
}

export default ListedSameCategoryTemplate

export const Query = graphql`
	query getPostsOnSameCategory($category: String!) {
	  allAsciidoc(filter: {frontmatter: {category: {eq: $category}}}) {
	    edges {
	      node {
	        frontmatter {
	          tags
	          category
	        }
	        fields {
	          slug
	        }
	        document {
	          title
	        }
	        revision {
	          date
	        }
	      }
	    }
	  }
	}`

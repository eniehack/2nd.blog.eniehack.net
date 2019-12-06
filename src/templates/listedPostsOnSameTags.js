import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

export const ListedSameTagsPostTemplate = ({ data, pageContext }) => {
		const article = data.allAsciidoc.edges;
		const { tag } = pageContext;
    return (
        <Layout>
          <SEO title={`Tags: ${tag}`} />
          <article>
            <h1 itemProp="name">
              {`Tags: ${tag}`}
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
											<time>{edges.node.revision.date}</time>
											<p>Tags: 
												{
													edges.node.frontmatter.tags.map((tag, tagsindex) => {
														return <span key={tagsindex}>{tag}</span>
													})
												}
											</p>
											<p>Category: {edges.node.frontmatter.category}</p>
										</div>
                  </section>
                )
            	})
						}
					</article>
        </Layout>
    )
}

export default ListedSameTagsPostTemplate

export const Query = graphql`
	query getPostsOnSameTag($tag: String!) {
	  allAsciidoc(filter: {frontmatter: {tags: {eq: $tag}}}) {
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
	  sitePage {
	    context {
	      tag
	    }
	  }
	}`

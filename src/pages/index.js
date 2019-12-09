import React from "react"
import Icon from "@mdi/react"
import { mdiCalendar, mdiTag, mdiFolder } from "@mdi/js"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Tag } from "antd"

export const showListedArticles = ({ data }) => {
	const articles = data.allAsciidoc.edges
	return (
		<Layout>
			<SEO title="Home" />
				<article>
					{
						articles.map(({ node }) => {
							return (
								<section key={node.id}> #style="margin-bottom: 20px;margin-top: 20px;">
									<h2>
										<Link to={"" + node.fields.slug}>
											{node.document.title}
										</Link>
									</h2>
									<div style={{display: "grid", gridTemplateColumns: "21px 1fr", gridTemplateRows: "21px 21px"}}>
										<Icon path={mdiCalendar}
											size={0.75}
										/>
										<p>{node.revision.date} - {"v" + node.revision.number}</p>
										<Icon 
											path={mdiTag}
											size={0.75}
										/>
										<span>
											{
												node.frontmatter.tags.map((tag, index) =>
													<Tag key={index}>
														<Link to={"/tags/"+tag+"/"}>
															{tag}
														</Link>
													</Tag>
												)
											}
										</span>
										<Icon
											path={mdiFolder}
											size={0.75}
										/>
										<Link to={"/categories/"+node.frontmatter.category}>
											<p>{node.frontmatter.category}</p>
										</Link>
									</div>
								</section>
							)
						})
					}
			</article>
		</Layout>
	)
}

export const query = graphql`
query MyQuery {
  allAsciidoc(sort: {order: DESC, fields: revision___date}) {
    edges {
      node {
				html
				id
				frontmatter {
          category
          tags
        }
				fields {
          slug
        }
				document {
					title
				}
        internal {
          description
          content
        }
        author {
          email
          authorInitials
        }
        revision {
          date
          number
          remark
        }
      }
    }
  }
}
`

export default showListedArticles

import React from "react"
import Icon from "@mdi/react"
import { mdiCalendar } from "@mdi/js"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const showListedArticles = ({ data }) => {
	const articles = data.allAsciidoc.edges
	return (
		<Layout>
			<SEO title="Home" />
			{
				articles.map(({ node }) => {
					return (
						<article key={node.id}>
							<section>
								<h2><Link to={"" + node.fields.slug}>{node.document.title}</Link></h2>
								<p>
									<Icon path={mdiCalendar}
										size={1}
									/>
									{node.revision.date} - {"v" + node.revision.number}</p>
							</section>
						</article>
					)
				})
			}
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

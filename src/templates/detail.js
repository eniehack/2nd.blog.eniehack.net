import React from "react"
import Icon from "@mdi/react"
import { mdiCalendar } from "@mdi/js"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const postDetailPageTemplate = ({ data }) => {
	const article = data.asciidoc
	return (
		<Layout>
      <SEO title={article.document.title} />
			<article>
				<section>
					<h1 itemProp="name">
						{article.document.title}
					</h1>
					<p>
						<Icon 
							path={mdiCalendar}
							size={0.75}
						/>
						<time itemProp="datepublished" dateTime={article.revision.date}>{article.revision.date}</time>
					</p>
					<div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.html }} />
				</section>
			</article>
    </Layout>
	)
}

export default postDetailPageTemplate

export const pageQuery = graphql`
	query getBlogPostFromSlug($slug: String!) {
		asciidoc(fields: {slug: {eq: $slug}}) {
			html
			document {
				title
			}
			fields {
				slug
			}
			revision {
				date
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`

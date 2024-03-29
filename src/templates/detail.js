import React from "react"
import Icon from "@mdi/react"
import { mdiCalendar, mdiFolder, mdiTag } from "@mdi/js"
import { Link, graphql } from "gatsby";
import { Tag } from "antd"

import Layout from "../components/layout"
import SEO from "../components/seo";
import Breadcrumb from "../components/breadcrumb";

export const postDetailPageTemplate = ({ data }) => {
	const article = data.asciidoc
	return (
		<Layout>
      <SEO title={article.document.title} />
			<article>
				<Breadcrumb slug={article.fields.slug} title={article.document.title} category={article.frontmatter.category}/>
				<section>
					<h1 itemProp="name">
						{article.document.title}
					</h1>
					<div>
						<div>
							<Icon 
								path={mdiCalendar}
								size={0.75}
							/>
							<time itemProp="datepublished" dateTime={article.revision.date}>{article.revision.date}</time>
							<Icon 
								path={mdiFolder}
								size={0.75}
							/>
							<Tag>
								<Link to={"/categories/"+article.frontmatter.category}>
									{article.frontmatter.category}
								</Link>
							</Tag>
						</div>
						<div>
							<Icon 
								path={mdiTag}
								size={0.75}
							/>
							{
								article.frontmatter.tags.map((tag, index) =>
									<Tag key={index}>
										<Link to={"/tags/"+tag}>
											{tag}
										</Link>
									</Tag>
								)
							}
						</div>
					</div>
				</section>
				<div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.html }} />
			</article>
    </Layout>
	)
}

export default postDetailPageTemplate

export const pageQuery = graphql`
	query getBlogPostFromSlug($slug: String!) {
		asciidoc(fields: {slug: {eq: $slug}}) {
			html
			frontmatter {
				category
				tags
			}
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

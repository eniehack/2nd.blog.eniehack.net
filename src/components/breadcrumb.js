import React from "react";
import { Link } from "gatsby";
import { Breadcrumb } from "antd";

export const breadcrumbTemplate = ({category, title, slug}) => {
	return (
		<Breadcrumb itemScope itemType="http://schema.org/BreadcrumbList">
			<Breadcrumb.Item 
				itemProp="itemListElement"
				itemScope
      	itemType="http://schema.org/ListItem"
			>
				<Link to={`/`} itemProp="item">
					<span itemProp="name">Home</span>
				</Link>
				<meta itemprop="position" content="1" />
			</Breadcrumb.Item>
			<Breadcrumb.Item 
				itemProp="itemListElement"
				itemScope
      	itemType="http://schema.org/ListItem"
			>
				<Link to={`/categories/${category}/`} itemProp="item">
					<span itemProp="name">{category}</span>
				</Link>
				<meta itemprop="position" content="2" />
			</Breadcrumb.Item>
			<Breadcrumb.Item 
				itemProp="itemListElement"
				itemScope
      	itemType="http://schema.org/ListItem"
			>
				<Link to={slug} itemProp="item">
					<span itemProp="name">{title}</span>
				</Link>
				<meta itemProp="position" content="3" />
			</Breadcrumb.Item>
		</Breadcrumb>
	)
}

export default breadcrumbTemplate
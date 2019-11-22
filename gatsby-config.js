const asciidoc = require("asciidoctor")();

class AsciidocConverter {
	constructor() {
		this.baseConverter = asciidoc.Html5Converter.$new();
	}

	convert(node, transform) {
		const nodeName = transform || node.getNodeName();
		if (nodeName === "section") {
			return `<section class="section"><div class="container"><h2 class="subtitle">${node.getTitle()}</h2>${node.getContent()}</div></section>`;
		}
		if (nodeName === "paragraph") {
			return `<p>${node.getContent()}<p>`
		}
		return this.baseConverter.convert(node, transform);
	}
}

module.exports = {
  siteMetadata: {
    title: `eniehack's blog`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@eniehack`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/articles`,
        name: "articles",
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `@hitsuji_no_shippo/gatsby-transformer-asciidoc`,
      options: {
				definesEmptyAttributes: false,
				converterFactory: AsciidocConverter,
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

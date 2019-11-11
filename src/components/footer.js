import React from "react";

const Footer = () => (
	<footer
    style={{
      padding: `3rem 1.5rem 6rem`,
      backgroundColor: `#fafafa`,
    }}
  >
    <p>Copyright &copy; {new Date().getFullYear()} Nakaya, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>.</p>
		Blog's articles is licensed by under CC-BY-ND 4.0.
    Blog's source is licensed by under MPL 2.0.
  </footer>
)

export default Footer
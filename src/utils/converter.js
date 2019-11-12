const asciidoc = require("asciidoctor")();

class CustomConverter {
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

export default CustomConverter;
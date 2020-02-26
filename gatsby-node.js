require('dotenv').config()


const path = require('path'),
	{ createFilePath } = require('gatsby-source-filesystem')

	
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions

	return graphql(`
	{
		allContentfulBlogPost {
			edges {
				node {
					slug
					id
					blog
				}
			}
		}
	}
`).then(result => {
	if (result.errors) {
		result.errors.forEach(e => console.error(e.toString()))
		return Promise.reject(result.errors)
	}

	const posts = result.data.allContentfulBlogPost.edges


	posts.forEach(edge => {
		if(edge.node.blog !== null && edge.node.blog.includes('AimHigher')) {
			const id = edge.node.id
			createPage({
				path: `blog/${edge.node.slug}`,
				component: path.resolve(`src/templates/blogTemplate.js`),
				// additional data can be passed via context
				context: {
					id,
				},
			})
		}
	})
}).then(
	graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fileAbsolutePath
						fields {
							slug
						}
						frontmatter {
							title
							section
						}
					}
				}
			}
		}
	`)
)
	
	.then(result => {
		if (!result) {
			console.log('error')
			return
		} else if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()))
			return Promise.reject(result.errors)
		}

		const data = result.data.allMarkdownRemark.edges

		data.forEach(edge => {
			const id = edge.node.id,
				filePath = edge.node.fileAbsolutePath,
				templates = {
					caseStudy: path.resolve('src/templates/caseStudy.js'),
					client: path.resolve('src/templates/clientPortal.js'),
					clientStyle: path.resolve('src/templates/styleGuide.js'),
					docs: path.resolve('src/templates/docTemplate.js'),
				},
				regexr = {
					caseStudy: '/src/data/case-studies',
					client: '/src/data/clients',
					docs: '/src/docs/',
				}

			let slugPath = edge.node.fields.slug,
				component = false,
				context = {
					id,
				},
				page = {
					path: slugPath,
					component: component,
					context: context,
				}

			if (RegExp(regexr.caseStudy).test(filePath)) {
				page.path = `portfolio${edge.node.fields.slug}`
				page.component = templates.caseStudy
			} else if (RegExp(regexr.client).test(filePath)) {
				page.path = `clients${edge.node.fields.slug}`
				page.component = templates.client
				page.context.clientId = edge.node.frontmatter.title

				createPage({
					path: `${page.path}style-guide`,
					component: templates.clientStyle,
					context: page.context
				})

				
			} else if (RegExp(regexr.docs).test(filePath)) {
				page.path = `docs/${edge.node.frontmatter.section.replace(/\s/g, '-').toLowerCase()}${edge.node.fields.slug}`
				page.component = templates.docs
			} else {
				return
			}

			createPage({
				path: slugPath,
				component: component,
				context: context,
			})
		})
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions


	if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

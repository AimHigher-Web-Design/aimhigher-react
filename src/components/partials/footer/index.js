import React from 'react'
import {StaticQuery, graphql, Link} from 'gatsby'

import Icon from '../../../../lib/parts/icon'

const Footer = () => (
	<StaticQuery
		query={graphql`
			query {
				footer: allFile(
					filter: {
						name: {
							eq: "footer"
						}
						sourceInstanceName: {
							eq: "menus"
						}
					}
				) {
					edges {
						node {
							childrenMenus {
								label
								link
							}
						}
					}
				}
				social: allFile(
					filter: {
						name: {
							eq: "social"
						}
						sourceInstanceName: {
							eq: "menus"
						}
					}
				) {
					edges {
						node {
							childrenMenus {
								label
								link
								icon
							}
						}
					}
				}
			}
		`}
		render={(data) => {
			const footer = data.footer.edges[0].node.childrenMenus
			const social = data.social.edges[0].node.childrenMenus

			return (
				<footer>
					<nav>
						<ul>
							{footer.map(({label, link}) => (
								<li key={label}>
									<Link to={link} activeClassName={`current`}>{label}</Link>
								</li>
							))}
						</ul>
					</nav>

					<nav>
						<ul>
							{social.map(({label, link, icon}) => (
								<li key={label}>
									<Icon icon={icon} />
									<a href={link} target="_blank">{label}</a>
								</li>
							))}
						</ul>
					</nav>
				</footer>
			)
		}}
	/>
)

export default Footer
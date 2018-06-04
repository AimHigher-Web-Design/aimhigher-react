import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ReactSVG from 'react-svg';

import { ExternalLink, Github } from 'react-feather';

//Resources
import siteList from '../../data/siteList.js';

//Importing Images
import FrameDesktop from '../../img/portfolio/desktop.svg';
import FrameTablet from '../../img/portfolio/tablet.svg';
import FrameMobile from '../../img/portfolio/mobile.svg';

//Importing Images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const screenshots = importAll(require.context('../../img/portfolio/', false, /\.(png)$/));

const placeholders = importAll(require.context('../../img/portfolio/', false, /\.(svg)$/));

class Meta extends Component {
	render() {
		let name = 'Portfolio | AimHigher Web Design';
		let description = "Check out other projects we've worked on";
		let slug = 'portfolio';
		let image = 'https://aimhigherwebdesign.com.au/img/logo.png';
		return (
			<Helmet>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link
					rel="canonical"
					href={'https://aimhigherwebdesign.com.au/' + slug}
				/>

				{/* Facebook */}
				<meta
					property="og:url"
					content={'https://aimhigherwebdesign.com.au/' + slug}
				/>

				<meta property="og:title" content={name} />
				<meta property="og:image" content={image} />
				<meta property="og:description" content={description} />

				{/* Twitter */}
				<meta
					name="twitter:url"
					content={'https://aimhigherwebdesign.com.au/' + slug}
				/>
				<meta name="twitter:title" content={name} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
			</Helmet>
		);
	}
}

class Portfolio extends Component {
	render() {
		return (
			<div>
				<Meta />
				<h1>Portfolio</h1>
				<Sites />
			</div>
		);
	}
}

class Sites extends Component {
	render() {
		let portfolio = siteList.map((item) => {
			let desktop = item.slug + '-desktop.png',
			tablet = item.slug + '-tablet.png',
			mobile = item.slug + '-mobile.png',
			desktopPlaceholder = item.slug + '-desktop.svg',
			tabletPlaceholder = item.slug + '-tablet.svg',
			mobilePlaceholder = item.slug + '-mobile.svg';
			return (
				<div key={item.slug} className={'site ' + item.slug}>
					<div className="mockups">
						<div className="image-container desktop">
							<ReactSVG path={FrameDesktop} />
							<img alt={'Desktop screenshot of ' + item.name} src={screenshots[desktop]} />
							<ReactSVG path={placeholders[desktopPlaceholder]} />
						</div>
						<div className="image-container tablet">
							<ReactSVG path={FrameTablet} />
							<img alt={'Tablet screenshot of ' + item.name} src={screenshots[tablet]} />
							<ReactSVG path={placeholders[tabletPlaceholder]} />
						</div>
						{item.mobile === true && (
							<div className="image-container mobile">
								<ReactSVG path={FrameMobile} />
								<img alt={'Mobile screenshot of ' + item.name} src={screenshots[mobile]} />
								<ReactSVG path={placeholders[mobilePlaceholder]} />
							</div>
						)}
					</div>
					<h2 className="name">
						{/* <Link to={'/' + item.slug}> */}
						{item.name}
						{/* </Link> */}
					</h2>
					{item.current === true && (
						<a href={'http://' + item.url} target="_blank">
							<h3 className="url">
								{item.url} {<ExternalLink />}
							</h3>
						</a>
					)}
					{item.github !== false && (
						<a
							aria-label="Link to Github Repository"
							href={item.github}
							className="repo"
							target="_blank"
						>
							{<Github />}
						</a>
					)}
					<h3 className="date">{item.date}</h3>
				</div>
			);
		});

		return <div className="portfolio content">{portfolio}</div>;
	}
}

export default Portfolio;
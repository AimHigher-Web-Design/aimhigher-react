import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

//Components
import {Meta} from '../../components/parts/index.js';

//Resources
import Graphic from '../../img/graphic.svg';
import Background from '../../img/wave.svg';
import ComputerCoffee from '../../img/computer_coffee.svg';
import Design from '../../img/design.svg';
import MultipleHands from '../../img/multiple_computers.svg';
import {ContentSVG, Hero, HeroBack, HeroContent, HomeContent, HomeGraphic} from './style.js';

const meta = {
	name: 'AimHigher Web Design',
	description: 'AimHigher Web Design bridges the gap between technology and business throughout Australia.',
	slug: '',
};

class Home extends Component {
	render() {
		return (
			<Fragment>
                <Meta {...meta} />
                <Hero>
                    <HeroBack path={Background} />
                    <HeroContent>
                        <HomeGraphic path={Graphic} />
                        <blockquote>Bridging the gap between businesses and technology</blockquote>
                    </HeroContent>
                </Hero>
				<HomeContent>
                    <p>AimHigher Web Design is based in Perth and helps businesses all over Australia in developing an online presence.</p>
                    <ContentSVG path={ComputerCoffee} />
                    <ContentSVG path={Design} />
                    <p>We specialise in building modern and professional websites that can be easily maintained by anyone, regardless of their technical skill.</p>
                    <p>AimHigher Web Design also provide prompt and efficient Aftersale support to keep your website working for you, while you get on with business.</p>
                    <ContentSVG path={MultipleHands} />
                </HomeContent>
            </Fragment>
		);
	}
}

export default Home;
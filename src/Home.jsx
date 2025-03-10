import React from 'react'
import Hero from './display/layout/pages/home/Hero'
import Show from './display/layout/pages/home/Show'
import Trending from './display/layout/pages/home/Trending'
import Branding from './display/layout/pages/home/Branding'
import Newsletter from './display/layout/pages/home/Newsletter'
import About from './display/layout/pages/home/About'

const Home = () => {
	return (<>
		<div id="home">
			<div className="lyt_container gap16">
				<Hero />
				<Show />
				<Trending />
			</div>

			<Branding />
			<About />
			<Newsletter />
		</div>

	</>
	)
}

export default Home
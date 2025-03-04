import React from 'react'
import Hero from './display/layout/pages/Hero'
import Show from './display/layout/pages/Show'
import Trending from './display/layout/pages/Trending'
import Branding from './display/layout/pages/Branding'
import Newsletter from './display/layout/pages/Newsletter'
import About from './display/layout/pages/About'

const Home = () => {
	return (<>
		<div id="home">
			<div className="lyt_container gap16">
				<Hero />
				<Show />
				<Trending />
			</div>
		</div>
		<Branding />
		<About/>
		<Newsletter/>
	</>
	)
}

export default Home
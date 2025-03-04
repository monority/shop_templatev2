import React from 'react'
import Hero from './display/layout/pages/Hero'
import Show from './display/layout/pages/Show'
import Trending from './display/layout/pages/Trending'

const Home = () => {
	return (
		<div id="home">

			<Hero />
			<Show />
			<Trending/>

		</div>
	)
}

export default Home
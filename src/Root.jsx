import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './display/layout/AppContainer'
import Footer from './display/components/ui/Footer';
import Header from './display/components/ui/Header';
import Home from './Home';
const Root = () => {
	return (
		<BrowserRouter>
			<AppContainer>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>
			</AppContainer>
			<Footer/>
		</BrowserRouter>
	)
}

export default Root;


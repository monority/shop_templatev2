import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppContainer from './display/layout/AppContainer'
import Footer from './display/components/ui/Footer';
import Header from './display/components/ui/Header';
import Home from './Home';
import ProductDetails from './display/layout/pages/product/ProductDetails';
import Error from './display/layout/pages/Error';
import Cart from './display/layout/pages/payment/Cart';
import Check from './display/layout/pages/auth/Check';
const Root = () => {
	return (
		<BrowserRouter>
			<AppContainer>
				{window.location.pathname === "check" ? <Header /> : null}
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="*" element={<Error />} />
					<Route exact path="/cart" element={<Cart />} />
					<Route exact path="/check" element={<Check />} />
				</Routes>
				{window.location.pathname === "check" ? <Footer /> : null}

			</AppContainer>
		</BrowserRouter>
	)
}

export default Root;


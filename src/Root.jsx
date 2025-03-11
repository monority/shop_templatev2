import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/layout/AppContainer'
import Footer from './display/components/ui/Footer';
import Header from './display/components/ui/Header';
import Home from './Home';
import ProductDetails from './display/layout/pages/product/ProductDetails';
import Error from './display/layout/pages/Error';
import Cart from './display/layout/pages/payment/Cart';
import Check from './display/layout/pages/auth/Check';

const Root = () => {
	const location = useLocation();

	return (
		<AppContainer>
			{location.pathname !== "/check" && <Header />}
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="*" element={<Error />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/check" element={<Check />} />
			</Routes>
			{location.pathname !== "/check" && <Footer />}
		</AppContainer>
	)
}

const App = () => (
	<BrowserRouter>
		<Root />
	</BrowserRouter>
);

export default App;

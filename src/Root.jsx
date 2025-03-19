import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/layout/AppContainer'
import Footer from './display/components/ui/layout/Footer';
import Header from './display/components/ui/layout/Header';
import Home from './Home';
import ProductDetails from './display/layout/pages/product/ProductDetails';
import Error from './display/layout/pages/Error';
import Cart from './display/layout/pages/payment/Cart';
import Check from './display/layout/pages/auth/Check';
import { UserContextProvider } from './cfg/state/useContext';
import AuthGuard from './cfg/guards/AuthGuard'
import Profile from './display/layout/pages/user/Profile'
import ScrollToTop from './display/components/utils/ScrollToTop';
const Root = () => {
	const location = useLocation();

	return (
		<UserContextProvider>
			<AppContainer>
				{!location.pathname.startsWith("/auth") && <Header />}
				<ScrollToTop>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="*" element={<Error />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path="/auth/check" element={<Check />} />
						<Route exact path="/auth/login" element={<Check />} />
						<Route exact path="/auth/register" element={<Check />} />
						<Route
							exact
							path="/user/profile"
							element={
								<AuthGuard>
									<Profile />
								</AuthGuard>
							}
						/>
					</Routes>
				</ScrollToTop>
				{!location.pathname.startsWith("/auth") && <Footer />}
			</AppContainer>
		</UserContextProvider>
	)
}

const App = () => (
	<BrowserRouter>
		<Root />
	</BrowserRouter>
);

export default App;

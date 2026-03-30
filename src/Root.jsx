import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AppContainer from './display/layout/AppContainer'
import Footer from './display/components/ui/layout/Footer';
import Header from './display/components/ui/layout/Header';
import AuthGuard from './cfg/guards/AuthGuard'
import ScrollToTop from './display/components/utils/ScrollToTop';
import { useStore } from './cfg/state/Store';

const Home = lazy(() => import('./Home'));
const ProductDetails = lazy(() => import('./display/layout/pages/product/ProductDetails'));
const Error = lazy(() => import('./display/layout/pages/Error'));
const Cart = lazy(() => import('./display/layout/pages/payment/Cart'));
const Shipping = lazy(() => import('./display/layout/pages/payment/Shipping'));
const Payment = lazy(() => import('./display/layout/pages/payment/Payment'));
const CheckoutSuccess = lazy(() => import('./display/layout/pages/payment/CheckoutSuccess'));
const WomenShoes = lazy(() => import('./display/layout/pages/catalog/WomenShoes'));
const Check = lazy(() => import('./display/layout/pages/auth/Check'));
const Profile = lazy(() => import('./display/layout/pages/user/Profile'));
const Favorites = lazy(() => import('./display/layout/pages/user/Favorites'));
const NewsletterThanks = lazy(() => import('./display/layout/pages/home/NewsletterThanks'));
const SizeGuide = lazy(() => import('./display/layout/pages/product/SizeGuide'));

const RouteSkeleton = () => (
	<section className="route_skeleton">
		<div className="layout-base gap2">
			<div className="skeleton_line skeleton_title" />
			<div className="skeleton_line skeleton_text" />
			<div className="skeleton_grid">
				<div className="skeleton_card" />
				<div className="skeleton_card" />
				<div className="skeleton_card" />
			</div>
		</div>
	</section>
);

const Root = () => {
	const location = useLocation();
	const initializeAuth = useStore(state => state.initializeAuth);

	useEffect(() => {
		const unsubscribe = initializeAuth();
		return () => unsubscribe();
	}, [initializeAuth]);

	return (
		<AppContainer>
			{!location.pathname.startsWith("/auth") && <Header />}
			<ScrollToTop>
				<Suspense fallback={<RouteSkeleton />}>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/shop" element={<WomenShoes />} />
						<Route path="/shop/:collection" element={<WomenShoes />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="*" element={<Error />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path="/checkout/shipping" element={<Shipping />} />
						<Route exact path="/checkout/payment" element={<Payment />} />
						<Route exact path="/checkout/success" element={<CheckoutSuccess />} />
						<Route exact path="/favorites" element={<Favorites />} />
						<Route exact path="/newsletter/thanks" element={<NewsletterThanks />} />
						<Route exact path="/size-guide" element={<SizeGuide />} />
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
				</Suspense>
			</ScrollToTop>
			{/* {!location.pathname.startsWith("/auth") && <Footer />} */}
		</AppContainer>
	)
}

const App = () => (
	<BrowserRouter>
		<Root />
	</BrowserRouter>
);

export default App;

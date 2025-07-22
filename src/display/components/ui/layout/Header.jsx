import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Account, Basket, Cart, Favorite, Favorite2, User } from '../SvgStack';
import Nav from './Nav';
import UserGuard from '../../../../cfg/guards/UserGuard';
import { useStore } from '../../../../cfg/state/Store';
const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const checkLocation = location.pathname === "/check";
	const [active, setActive] = useState(true);
	const [scroll, setScrolled] = useState(false);
	const number = useStore(state => state.products);
	const user = useStore(state => state.user);
	useEffect(() => {
		const headerChange = () => {
			setActive(window.scrollY < 200);
		};

		window.addEventListener("scroll", headerChange);

		return () => {
			window.removeEventListener("scroll", headerChange);
		};
	}, []);
	const checkQuantities = () => {
		if (user && user.products) {
			const total = user.products.reduce((acc, product) => acc + (product.quantity || 0), 0);
			return total > 0 ? total : '';
		}
		return '';
	};

	const checkFavorites = () => {
		if (user && user.favorites) {
			const total = user.favorites.length;
			return total > 0 ? total : '';
		}
		return '';
	}
	return (
		<>

			<header>
				<div className="lyt_container h_100">
					<div className="container_column gap2 h_100">
						<div className="container_between w_100">
							<div className="element">
								<h1 className='cursor_pointer lower' onClick={() => navigate("/")}>sneak<strong className='text_color03'>ara</strong>.</h1>
							</div>

							<ul className="wrapper_row gap2">
								<UserGuard>
									<li className="element text_size01 cursor_pointer" onClick={() => navigate("/user/profile")}>
										<div className="element_center">
											<User width="2.8rem" height="2.8rem" />
										</div>
										<div className="element_center">
											<p className='text_size02'>{user?.username}</p>
										</div>
									</li>
								</UserGuard>
								{!user && (
									<UserGuard fallback>
										<li className="element text_size01 cursor_pointer" onClick={() => navigate("/auth/check")}>
											<div className="element_center">
												<Account width="2.8rem" height="2.8rem" />
											</div>
											<div className="element_center">
												<p className='text_size02'>User</p>
											</div>
										</li>
									</UserGuard>
								)}

								<li className="element text_size01 cursor_pointer relative" onClick={() => navigate("/cart")}>
									<div className="element_center">
										<Basket width="2.8rem" height="2.8rem" />
									
									</div>
									<div className="element_number">
										<div className={user?.products && user?.products?.length > 0 ? 'background cart_bg' : ''}>
											<p> {checkQuantities()}</p>

										</div>
									</div>
								</li>
								<li className="element text_size01 cursor_pointer relative" onClick={() => navigate("/favorites")}>
									<div className="element_center">
										<Favorite2 idth="2.8rem" height="2.8rem" color="currentColor" />
									</div>
									<div className="element_number">
										<div className={user?.favorites && user.favorites.length > 0 ? 'background favorite_bg' : ''}>
											<p> {checkFavorites()}</p>

										</div>
									</div>
								</li>
							</ul>
						</div>
						<Nav />
					</div>
					<hr />
				</div>
			</header >

		</>
	);
};

export default Header;
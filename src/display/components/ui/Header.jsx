import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, Favorite, User } from './SvgStack';
import Nav from './Nav';
const Header = () => {
	const navigate = useNavigate();

	const [active, setActive] = useState(true);
	const [scroll, setScrolled] = useState(false);
	const [user, setUser] = useState({ name: "Guest" });
	useEffect(() => {
		const headerChange = () => {
			setActive(window.scrollY < 200);
		};

		window.addEventListener("scroll", headerChange);

		return () => {
			window.removeEventListener("scroll", headerChange);
		};
	}, []);

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
								<li className="element text_size01 cursor_pointer">
									<div className="element_center">
										<User width="2rem" height="2rem" />
									</div>
									<div className="element_center">
										<p className='text_size02'	>User</p>
									</div>

								</li>
								<li className="element text_size01 cursor_pointer" onClick={() => navigate("/cart")}>
									<div className="element_center">
										<Cart width="2rem" height="2rem" />
									</div>
									<div className="element_center">
										<p className='text_size02'>Cart</p>
									</div>
								</li>
								<li className="element text_size01 cursor_pointer">
									<div className="element_center">
										<Favorite width="2rem" height="2rem" />
									</div>
									<div className="element_center">
										<p className='text_size02'>Favorites</p>
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

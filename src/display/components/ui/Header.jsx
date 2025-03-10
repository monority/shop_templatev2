import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, Favorite, User } from './SvgStack';
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
				<div className="container_between lyt_container">
					<div className="element">
						<h1 className='cursor_pointer' onClick={() => navigate("/")}>sneak<strong>ara</strong>.</h1>
					</div>

					<ul className="wrapper_row gap1">
						<li className="element text_size01">
							<div className="element">
								User
							</div>
							<div className="element">
								<User width="2rem" height="2rem" />
							</div>
						</li>
						<li className="element text_size01">

							<div className="element">
								Cart
							</div>
							<div className="element">
								<Cart width="2rem" height="2rem" />
							</div>
						</li>
						<li className="element text_size01">
							<div className="element">
								Favorites
							</div>
							<div className="element">
								<Favorite width="2rem" height="2rem" />
							</div>
						</li>
					</ul>

				</div>
			</header >
		</>
	);
};

export default Header;

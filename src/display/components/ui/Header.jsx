import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();

	const [active, setActive] = useState(true);
	const [scroll, setScrolled] = useState(false);
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
						<li className="element text_size01">Newsletter</li>
						<li className="element text_size01">Help</li>
						<li className="element text_size01">Order Status</li>
					</ul>

				</div>
			</header>
		</>
	);
};

export default Header;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
	{ label: "Women", path: "/shop/women" },
	{ label: "Men", path: "/shop/men" },
	{ label: "Trending", path: "/shop/trending" },
	{ label: "New", path: "/shop/new" },
	{ label: "Sale", path: "/shop/sale", variant: "sale" },
];

const Nav = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const handleNavigate = (path) => {
		navigate(path);
		setIsOpen(false);
	};

	const isActive = (path) => location.pathname.startsWith(path);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<nav className="site-nav" aria-label="Main navigation">
			<div className="site-nav__desktop">
				<ul className="site-nav__list">
					{NAV_ITEMS.map((item) => (
						<li key={item.path} className="site-nav__item">
							<button
								type="button"
								className={[
									"site-nav__link",
									isActive(item.path) ? "site-nav__link--active" : "",
									item.variant === "sale" ? "site-nav__link--sale" : "",
								]
									.filter(Boolean)
									.join(" ")}
								onClick={() => handleNavigate(item.path)}
							>
								<span className="site-nav__label">{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>

			<button
				type="button"
				className={`site-nav__toggle ${isOpen ? "site-nav__toggle--active" : ""}`}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				aria-expanded={isOpen}
				aria-controls="mobile-navigation"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span className="site-nav__toggle-line" />
				<span className="site-nav__toggle-line" />
				<span className="site-nav__toggle-line" />
			</button>

			<div className={`site-nav__overlay ${isOpen ? "site-nav__overlay--visible" : ""}`} onClick={() => setIsOpen(false)} />

			<div
				id="mobile-navigation"
				className={`site-nav__drawer ${isOpen ? "site-nav__drawer--open" : ""}`}
				aria-hidden={!isOpen}
			>
				<div className="site-nav__drawer-header">
					<p className="site-nav__drawer-title">Collections</p>
					<button
						type="button"
						className="site-nav__drawer-close"
						aria-label="Close menu"
						onClick={() => setIsOpen(false)}
					>
						×
					</button>
				</div>

				<ul className="site-nav__drawer-list">
					{NAV_ITEMS.map((item) => (
						<li key={item.path} className="site-nav__drawer-item">
							<button
								type="button"
								className={[
									"site-nav__drawer-link",
									isActive(item.path) ? "site-nav__drawer-link--active" : "",
									item.variant === "sale" ? "site-nav__drawer-link--sale" : "",
								]
									.filter(Boolean)
									.join(" ")}
								onClick={() => handleNavigate(item.path)}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
<li className="element text_size01 cursor_pointer" onClick={() => navigate("/auth/check")}>
	<div className="element_center">
		<User width="2.8rem" height="2.8rem" />
	</div>
	<UserGuard>
		{/* Content to show when user is authenticated */}
		<div className="element_center">
	const location = useLocation();
	const checkLocation = location.pathname === "/check";
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
					<div className="lyt_container h_100">
						<div className="container_column gap2 h_100">
							<div className="container_between w_100">
								<div className="element">
									<h1 className='cursor_pointer lower' onClick={() => navigate("/")}>sneak<strong className='text_color03'>ara</strong>.</h1>
								</div>

								<ul className="wrapper_row gap2">
									<li className="element text_size01 cursor_pointer" onClick={() => navigate("/auth/check")}>
										<div className="element_center">
											<User width="2.8rem" height="2.8rem" />
										</div>
										<UserGuard>
											
										</UserGuard>
										<div className="element_center">
											<p className='text_size02'>User</p>
										</div>

									</li>
									<li className="element text_size01 cursor_pointer" onClick={() => navigate("/cart")}>
										<div className="element_center">
											<Cart width="2.8rem" height="2.8rem" />
										</div>
										<div className="element_center">
											<p className='text_size02'>Cart</p>
										</div>
									</li>
									<li className="element text_size01 cursor_pointer">
										<div className="element_center">
											<Favorite width="2.8rem" height="2.8rem" />
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

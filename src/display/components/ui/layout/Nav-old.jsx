import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const navigate = useNavigate();

	const collections = [
		{ label: 'Women', path: '/shop/women' },
		{ label: 'Men', path: '/shop/men' },
		{ label: 'Trending', path: '/shop/trending' },
		{ label: 'New', path: '/shop/new' },
		{ label: 'Sale', path: '/shop/sale', className: 'text_red' },
	];

	return (
		<>
			<div className="container_start">
				<ul className="wrapper_row gap1">
					{collections.map((item) => (
						<li
							key={item.path}
							className={`cursor_pointer ${item.className || ''}`.trim()}
							onClick={() => navigate(item.path)}
						>
							{item.label}
						</li>
					))}
				</ul>

			</div>
		</>
	)
}

export default Nav
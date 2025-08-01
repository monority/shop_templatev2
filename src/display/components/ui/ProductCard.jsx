import React, { useState } from 'react';
import { useNavigate } from 'react-router';
const ProductCard = ({ img, title, colors, price, type, description, id, action }) => {
	const [hover, SetHover] = useState(false);
	const [state, setCoords] = useState({ x: 0, y: 0 })
	const navigate = useNavigate();
	const onMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
		const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
		setCoords({ x, y });
	};
	return (
		<div id="product_card" className='cursor_pointer' onClick={action}>
			<div className="wrapper_column gap2 relative" onClick={() => navigate(`/product/${id}`)}>
				<div className='hover_fg' style={{
					left: `${state.x + 15}px`,
					top: `${state.y}px`,
					display: hover ? 'block' : 'none',
				}}><p>Shop it </p> <p>{price} €</p></div>
			</div>
			<div className="element_center bg_color03" onMouseMove={onMouseMove} onMouseEnter={() => SetHover(true)} onMouseLeave={() => SetHover(false)}>
				<img src={img} className='image_card' alt={title}  loading='lazy'/>
			</div>
			<div className="wrapper_column gap2">
				<div className="element_between">
					<div className="element">
						<h4>{title}</h4>
					</div>
					<div className="element">
						<h5 className='text_color02'>{type}</h5>
					</div>
				</div>
				<div className="element">
					{colors.map((color, index) => (
						<svg
							key={index}
							size="2rem"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
						>
							<path
								fill={color} strokeWidth="0.03rem" stroke="#444444"
								d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"
							/>
						</svg>
					))}
				</div>
				<div className="element">
					<p className="text_color05 text_size02 break_word">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

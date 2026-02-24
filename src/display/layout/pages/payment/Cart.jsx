import React from 'react'
import { useStore } from '../../../../cfg/state/Store';
import { Cancel } from '../../../components/ui/SvgStack';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const state_products = useStore(state => state.user.products);
	const state_RemoveProduct = useStore((state) => state.removeProduct);
	const state_UpdateProduct = useStore((state) => state.updateProduct);
	const navigate = useNavigate();
	const productPrice = () => {
		if (state_products && state_products.length > 0) {
			return state_products.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0);
		}
		return 0;
	}

	const handleQuantityChange = (cartId, newQuantity) => {
		const quantity = Math.max(1, parseInt(newQuantity) || 1);
		const product = state_products.find(p => p.cartId === cartId);
		if (product) {
			state_UpdateProduct({
				...product,
				quantity: quantity
			});
		}
	}

	const incrementQuantity = (cartId) => {
		const product = state_products.find(p => p.cartId === cartId);
		if (product) {
			handleQuantityChange(cartId, product.quantity + 1);
		}
	}

	const decrementQuantity = (cartId) => {
		const product = state_products.find(p => p.cartId === cartId);
		if (product && product.quantity > 1) {
			handleQuantityChange(cartId, product.quantity - 1);
		}
	}

	const showCart = () => {
		if (state_products && state_products.length > 0) {
			return state_products.map((product, index) => (
				<div key={index} className="product_item">
					<div className="element">
						<img src={product.image} alt={product.name} className="favorite-image" />
					</div>
					<div className="container_item">
						<div className="wrapper_top">
							<div className="element">
								<h4 className='underline pointer' onClick={() => navigate(`/product/${product.id}`, { replace: true })}>{product.name}</h4>
								<p className='text_color03'>
									{product.size && <span>Size: {product.size}</span>}
									{product.size && product.color && <span> · </span>}
									{product.color && <span>Color: {product.color}</span>}
								</p>
							</div>
							<div className="element">
								<Cancel size="2rem" action={() => removeProduct(product.cartId)} />
							</div>
						</div>
						<div className="wrapper_top">
							<div className="element_center">
								<p className="price">${(parseFloat(product.price) * product.quantity).toFixed(2)}</p>
							</div>
							<div className="quantity_controls">
								<button
									className=" btn_quantity"
									onClick={() => decrementQuantity(product.cartId)}
									disabled={product.quantity <= 1}
								>
									-
								</button>
								<span className="quantity-display">{product.quantity}</span>
								<button
									className=" btn_quantity"
									onClick={() => incrementQuantity(product.cartId)}
								>
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			));
		} else {
			return <p>No products found.</p>;
		}
	}

	const removeProduct = (cartId) => {
		state_RemoveProduct(cartId);
	}

	return (
		<>
			<section id="cart">
				<div className="lyt_container gap4">
					<div className="wrapper_center">

						<div className="breadcrumb">
							<span className="active">Cart</span>
							<span className="separator"> → </span>
							<span className="inactive">Location</span>
							<span className="separator"> → </span>
							<span className="inactive">Payment</span>
						</div>

					</div>
					<div className="container_global">
						<div className="wrapper_cart">
							{showCart()}
						</div>
						<div className="wrapper">
							<div className="element">
								<h4>Price details</h4>
							</div>
							<div className="element">
								<p>${productPrice().toFixed(2)}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Cart
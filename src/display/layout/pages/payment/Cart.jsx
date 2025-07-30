import React from 'react'
import { useStore } from '../../../../cfg/state/Store';
import { Cancel } from '../../../components/ui/SvgStack';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const state_products = useStore(state => state.user.products);
	const state_RemoveProduct = useStore((state) => state.removeProduct);
	const state_UpdateProduct = useStore((state) => state.updateProduct);
	console.log("Cart products:", state_products);
	const navigate = useNavigate();
	const productPrice = () => {
		if (state_products && state_products.length > 0) {
			return state_products.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0);
		}
		return 0;
	}

	const handleQuantityChange = (productId, newQuantity) => {
		const quantity = Math.max(1, parseInt(newQuantity) || 1);
		const product = state_products.find(p => p.id === productId);
		if (product) {
			state_UpdateProduct({
				...product,
				quantity: quantity
			});
		}
	}

	const incrementQuantity = (productId) => {
		const product = state_products.find(p => p.id === productId);
		if (product) {
			handleQuantityChange(productId, product.quantity + 1);
		}
	}

	const decrementQuantity = (productId) => {
		const product = state_products.find(p => p.id === productId);
		if (product && product.quantity > 1) {
			handleQuantityChange(productId, product.quantity - 1);
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
								<h4 className='underline pointer' onClick={() => navigate(`/product/${product.id}` , {replace: true})}>{product.name}</h4>
								<p>{product.description}</p>

							</div>
							<div className="element">
								<Cancel size="2rem" action={() => removeProduct(product.id)} />
							</div>
						</div>
						<div className="wrapper_top">
							<div className="element_center">
								<p className="price">${(parseFloat(product.price) * product.quantity).toFixed(2)}</p>
							</div>
							<div className="quantity_controls">
								<button
									className=" btn_quantity"
									onClick={() => decrementQuantity(product.id)}
									disabled={product.quantity <= 1}
								>
									-
								</button>
								<span className="quantity-display">{product.quantity}</span>
								<button
									className=" btn_quantity"
									onClick={() => incrementQuantity(product.id)}
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

	const removeProduct = (id) => {
		state_RemoveProduct(id);
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
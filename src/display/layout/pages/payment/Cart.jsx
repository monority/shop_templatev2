import React from 'react'
import { useStore } from '../../../../cfg/state/Store';

const Cart = () => {
	const state_products = useStore(state => state.user.products);
	const state_RemoveProduct = useStore((state) => state.removeProduct);
	const productPrice = () => {
		if (state_products && state_products.length > 0) {
			return state_products.reduce((total, product) => total + (product.price * product.quantity), 0);
		}
		return 0;
	}
	const showCart = () => {

		if (state_products && state_products.length > 0) {
			return state_products.map((product, index) => (
				<div key={index} className="favorite-item">
					<div className="element">
						<img src={product.image} alt={product.name} className="favorite-image" />
					</div>
					<div className="wrapper_between">
						<div className="element">
							<h2>{product.name}</h2>
							<p>{product.description}</p>
							<p className="price">${productPrice()}</p>
						</div>
						<div className="element">
							<p>Edit Quantity : <input type="number" min="1" defaultValue={product.quantity} /></p>
						</div>
						<div className="element">
							<button onClick={() => removeProduct(product.id)} className="btn btn-danger">X</button>
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
			<section id="products">
				<div className="lyt_container gap4">
					<div className="wrapper">
						<div className="element">
							<h1>Products</h1>
						</div>
					</div>
					{showCart()}

				</div>
			</section>
		</>
	)
}

export default Cart
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Payment = () => {
	const navigate = useNavigate();

	return (
		<section id="checkout_payment">
			<div className="lyt_container gap4">
				<div className="wrapper_center">
					<div className="breadcrumb">
						<Link className="inactive" to="/cart">Cart</Link>
						<span className="separator"> → </span>
						<Link className="inactive" to="/checkout/shipping">Location</Link>
						<span className="separator"> → </span>
						<Link className="active" to="/checkout/payment">Payment</Link>
					</div>
				</div>

				<div className="wrapper_column gap2">
					<div className="element">
						<h1>Payment</h1>
					</div>
					<div className="element">
						<p>This template step is ready to connect to your payment provider.</p>
					</div>
				</div>

				<div className="wrapper_row gap1">
					<button className='btn btn_secondary' onClick={() => navigate('/checkout/shipping')}>Back to Shipping</button>
					<button className='btn btn_base' onClick={() => navigate('/')}>Confirm and Return Home</button>
				</div>
			</div>
		</section>
	)
}

export default Payment;

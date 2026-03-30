import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NewsletterThanks = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.state?.email;

	return (
		<section id="newsletter_thanks">
			<div className="layout-base h_100">
				<div className="container_center h_100">
					<div className="wrapper_column gap3">
						<div className="element_center">
							<h1>Subscription Confirmed</h1>
						</div>
						<div className="element_center">
							<p className='text_center'>
								{email ? `Thanks ${email}, you are now on the Sneakara newsletter.` : 'Thanks, you are now on the Sneakara newsletter.'}
							</p>
						</div>
						<div className="element_center w_100 gap1">
							<button className='btn btn_base' onClick={() => navigate('/shop/new')}>See New Arrivals</button>
							<button className='btn btn_secondary' onClick={() => navigate('/')}>Back Home</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default NewsletterThanks;

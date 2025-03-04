import React from 'react'
import ProductCard from '../../../components/ui/ProductCard'
import { useNavigate } from 'react-router'
import { data } from '../../../../temp/ProductData'
const Trending = () => {

	const navigate = useNavigate();
	const navigation = (id) => {
		navigate(`product/${id}`, { replace: true })
	}
	const filter_sneakers = data.slice(0, 8).filter(item => item.isTrending === true);
	const display_sneakers = filter_sneakers.map(sneaker => {
		return (
			<ProductCard
				key={sneaker.id}
				id={sneaker.id}
				title={sneaker.title}
				colors={sneaker.colors}
				description={sneaker.description}
				img={sneaker.image}
				type={sneaker.category}
				price={sneaker.price}
				stars={sneaker.stars}
				action={() => navigation(sneaker.id)}
				hover={sneaker.title}
			/>)
	})

	return (
		<>
			<section id="trending">
				<div className="wrapper">
					<div className="element">
						<h1 className='text_center'>Trending</h1>
					</div>
				</div>
				<div className="container">
					{display_sneakers}
				</div>

			</section>
		</>
	)
}

export default Trending
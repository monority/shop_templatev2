import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { data } from '../../../../temp/ProductData';
import { Favorite } from '../../../components/ui/SvgStack';

const ProductDetails = () => {
	const { id } = useParams();
	const [activeSize, setActiveSize] = useState();
	const [activeColor, setActiveColor] = useState();
	const product = data.find(item => item.id == id);
	const sizes = product?.availableSizes?.map((size, index) => {
		return (
			<>
				<li key={index} className={`${activeSize === size ? 'activeSize' : ''} defaultSize`}
					onClick={() => setActiveSize(size)}>{size}</li>
			</>
		)
	})
	const colors = product?.colors.map((color, index) => {
		return (
			<>
				<li key={index} className={`${activeColor === color ? 'activeColor' : ''} defaultColor`}
					onClick={() => setActiveColor(color)}>{color}</li>
			</>
		)

	})


	return (
		<section id="productdetails">
			<div className="lyt_container gap4">
				<div className="wrapper">
					<p>{product?.category} {">"} {product?.brand}</p>
				</div>
				<div className="container_content">
					<div className="container_display">
						<div className="wrapper_center border_radius05 bg_color03">
							<img src={`/${product?.image}`} alt="" />
						</div>
					</div>
					<div className="container_details">
						<div className="flex space_between w_100">
							<div className="element">
								<p>{product?.brand}</p>
							</div>
							<div className="element">
								<p>{product?.codeProduct}</p>
							</div>
						</div>
						<div className="wrapper_column gap2">
							<div className="element">
								<h1>{product?.title}</h1>
							</div>
							<div className="element">
								<p>Reviews</p>
							</div>
							<div className="element">
								<h2>{product?.price} $</h2>
							</div>
							<ul className="element_row gap1">
								{colors}
							</ul>
							<div className="wrapper_row gap4">
								<div className="element">
								<h2>Sizes</h2>

								</div>
								<div className="element">
									<p>{product?.sizeDetail}</p>
								</div>
							</div>
							<ul className="element_row gap1">
								{sizes}
							</ul>
							<div className="element">
								<p>Size guide</p>
							</div>
							<div className="wrapper_btn">
								<button className='btn btn_base'>Add to cart</button>
								<button className='btn bg_color01 text_color01 border_color01'><Favorite width="1.5rem" height="1.5rem"/></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductDetails
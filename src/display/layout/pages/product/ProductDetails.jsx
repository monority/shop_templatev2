import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../../../../temp/ProductData';
import { Favorite } from '../../../components/ui/SvgStack';
import { reviews } from '../../../../temp/Reviews';
import ReviewsTemplate from './../../../components/ui/reviews/ReviewsTemplate';
import { calculateDate } from '../../../components/utils/calculateDate';
import { renderStars } from '../../../components/ui/ratings/Stars';
import ProductManagement from '../../../../data/product/ProductManagement';
import { useStore } from '../../../../cfg/State/Store';

const ProductDetails = () => {
	const { handleAddProduct } = ProductManagement();
	const { handleUpdateProduct } = ProductManagement();
	const { id } = useParams();
	const [activeSize, setActiveSize] = useState();
	const [activeColor, setActiveColor] = useState();
	const [average, setAverage] = useState(0);
	const product = data.find(item => item.id == id);
	const user = useStore(state => state.user);
	console.log(user)
	const addProductHandler = () => {
		if (product) {
			let currentProduct = user?.products?.find(product => user?.product?.id === product.id);
			console.log(currentProduct)
			if (currentProduct) {
				currentProduct.quantity++;
				const productObject = { name: product.title, price: product.price, codeProduct: product.codeProduct, quantity: currentProduct.quantity };
				handleUpdateProduct(productObject);
				return;

			}
		}
		handleAddProduct({ name: product.title, price: product.price, codeProduct: product.codeProduct });
	};

	const addProductFavorite = () => {
		if (product) {
			let currentProduct = user?.products?.find(product => user?.product?.id === product
.id);
			if (currentProduct) {
				currentProduct.favorite = !currentProduct.favorite;
				const productObject = { name: product.title, price: product.price, codeProduct: product.codeProduct, favorite: currentProduct.favorite };
				handleUpdateProduct(productObject);
				return;
			}
		}
		handleAddProduct({ name: product.title, price: product.price, codeProduct: product.codeProduct, favorite: true });
	};
	useEffect(() => {
		if (product) {
			if (product.availableSizes && product.availableSizes.length > 0) {
				setActiveSize(product.availableSizes[0]);
			}
			if (product.colors && product.colors.length > 0) {
				setActiveColor(product.colors[0]);
			}
		}
	}, [product]);

	const sizes = product?.availableSizes?.map((size, index) => (
		<li key={index} className={`${activeSize === size ? 'activeSize' : ''} defaultSize`}
			onClick={() => setActiveSize(size)}>{size}</li>
	));

	const colors = product?.colors.map((color, index) => (
		<li key={index} className={`${activeColor === color ? 'activeColor' : ''} defaultColor`}
			onClick={() => setActiveColor(color)}>{color}</li>
	));

	const filteredReviews = reviews.filter((review) =>
		review.rating.some((rating) => rating?.ref === product?.codeProduct)
	);

	const reviews_display = filteredReviews?.map((review) => {
		const matchingRating = review.rating.find((rate) => rate.ref === product?.codeProduct);

		return (
			<ReviewsTemplate
				key={review.id}
				id={review.id}
				message={review.message}
				name={review.name}
				date={calculateDate(review?.date)}
				mark={renderStars(matchingRating?.mark)}
				gender={review?.gender}
			/>
		);
	});
	const totalMarks = filteredReviews?.reduce((acc, review) => {
		const matchingRating = review?.rating?.find((rate) => rate.ref === product?.codeProduct);
		const mark = Number(matchingRating?.mark) || 0;
		return acc + mark;
	}, 0);

	const averageRating = filteredReviews?.length ? totalMarks / filteredReviews.length : 0;
	const clampedRating = Math.min(averageRating, 5);

	return (
		<section id="productdetails">
			<div className="lyt_container gap4">
				<div className="element_start gap1">
					<p className='text_color03'>{product?.category}</p><p> {">"} {product?.brand}</p>
				</div>
				<div className="container_content">
					<div className="container_display">
						<div className="wrapper_center border_radius05 bg_color03 border_color02 w_100">
							<img src={`/${product?.image}`} className='product_image' alt="product image" />
						</div>
					</div>
					<div className="container_details">
						<div className="flex space_between w_100">
							<div className="element">
								<p>{product?.brand}</p>
							</div>
							<div className="element">
								<p className='text_color03'>{product?.codeProduct}</p>
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
								<button className='btn btn_base' onClick={() => addProductHandler(product.id)}>Add to cart</button>
								<button className='btn bg_color01 text_color01 border_color01'><Favorite width="1.5rem" height="1.5rem" /></button>
							</div>
							<div className="element">
								<p>Free delivery over <strong>$30.00</strong></p>
							</div>
						</div>
					</div>
				</div>
				<div className="container_content">
					<div className="container_display">
						<div className="container_column gap2">
							<ul className='wrapper_row gap2'>
								<li>Details</li>
								<li>Details</li>
								<li>Details</li>
							</ul>
							<div className="wrapper_column gap2">
								<div className="element">
									<select name="" id="">
										<option value="new">Newest</option>
										<option value="new">Oldest</option>
										<option value="new">Top</option>
										<option value="new">Worst</option>
									</select>
								</div>
								<div className="wrapper_column gap2">
									{reviews_display}
								</div>
							</div>
						</div>
					</div>
					<div className="container_details">
						<div className="wrapper_end">
							{renderStars(clampedRating)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../../../../temp/ProductData';
import { Favorite } from '../../../components/ui/SvgStack';
import { reviews } from '../../../../temp/Reviews';
import ReviewsTemplate from './../../../components/ui/reviews/ReviewsTemplate';
import { calculateDate } from '../../../components/utils/calculateDate';
import { renderStars } from '../../../components/ui/ratings/Stars';
import { useStore } from '../../../../cfg/state/Store';

const ProductDetails = () => {
	const { id } = useParams();
	const [activeSize, setActiveSize] = useState();
	const [added, setAdded] = useState(false);
	const [sortOrder, setSortOrder] = useState('newest');
	const state_AddProduct = useStore((state) => state.addProduct);
	const state_RemoveProduct = useStore((state) => state.removeProduct);
	const state_UpdateProduct = useStore((state) => state.updateProduct);
	const state_UpdateQuantityProduct = useStore((state) => state.updateQuantityProduct);
	const state_AddFavorite = useStore((state) => state.toggleProductFavorite);
	const [activeColor, setActiveColor] = useState();
	const product = data.find(item => item.id == id);
	const user = useStore(state => state.user);
	const isFavorite = user?.favorites?.some(fav => fav.id === product?.id);

	const handleAddProduct = (product) => {
		state_AddProduct(product);
	};
	const handleUpdateProduct = (product) => {
		state_UpdateProduct(product);
	}
	const handleQuantityUpdate = (product) => {
		state_UpdateQuantityProduct(product);

	}
	const handleToggleFavorite = () => {
		if (product) {
			state_AddFavorite({
				id: product.id,
				name: product.title,
				price: product.price,
				codeProduct: product.codeProduct,
				brand: product.brand,
				image: product.image,
				category: product.category
			});
		}
	};
	const state_AddProductHandler = () => {
		const cartId = `${id}_${activeSize}_${activeColor}`;
		const currentProduct = user?.products?.find(p => p.cartId === cartId);
		if (currentProduct) {
			handleQuantityUpdate(cartId);
		} else {
			handleAddProduct({
				id: id,
				image: product.image,
				name: product.title,
				price: product.price,
				codeProduct: product.codeProduct,
				quantity: 1,
				size: activeSize,
				color: activeColor
			});
		}
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};
	const cartId = `${id}_${activeSize}_${activeColor}`;
	const findProduct = user?.products?.find(p => p.cartId === cartId);

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

	const sortedReviews = [...filteredReviews].sort((a, b) => {
		const markA = Number(a.rating.find(r => r.ref === product?.codeProduct)?.mark) || 0;
		const markB = Number(b.rating.find(r => r.ref === product?.codeProduct)?.mark) || 0;
		if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
		if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
		if (sortOrder === 'top') return markB - markA;
		if (sortOrder === 'worst') return markA - markB;
		return 0;
	});

	const reviews_sorted = sortedReviews.map((review) => {
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
								<button className='btn btn_base' onClick={() => state_AddProductHandler()}>
									{findProduct ? 'Add more' : 'Add to cart'}
								</button>
								{added && <p className='text_color03 container-add'>✓ Added to cart</p>}								<button
									className={`btn ${isFavorite ? 'btn btn_favorite_active' : 'btn btn_favorite'}`}
									onClick={handleToggleFavorite}
								>
									<Favorite
										size="1.5rem"
										color={isFavorite ? 'white' : 'black'}
									/>
								</button>
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
									<select className="reviews_sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
										<option value="newest">Newest</option>
										<option value="oldest">Oldest</option>
										<option value="top">Top rated</option>
										<option value="worst">Worst rated</option>
									</select>
								</div>
								<div className="wrapper_column gap2">
									{reviews_sorted}
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
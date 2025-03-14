import React, { useEffect, useState } from 'react'
import ReviewCard from '../../../components/ui/reviews/ReviewCard'
import { renderStars } from "../../../components/ui/ratings/Stars"
import { reviews } from '../../../../temp/Reviews_web'
import { ArrowLeft, ArrowRight } from '../../../components/ui/SvgStack';
const Hero = () => {
	const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
	const currentReview = reviews[currentReviewIndex];
	const averageRating = reviews?.reduce((sum, review) => sum + review.rating, 0) / reviews?.length;
	const reviewList = () => {
		return (
			<ReviewCard
				key={currentReview.id}
				id={currentReview.id}
				comment={currentReview.comment}
				name={currentReview.name}
				average={averageRating}
				review_total={reviews.length}
				stars={renderStars(averageRating)}
				title={currentReview.title}
			/>
		)
	}

	return (
		<>
			<section id="hero">
				<div className="container gap8">
					<div className="wrapper gap4 w_100 f_basis50">
						<div className="element_center">
							<h1 className='text_center'>Trendy shoes of luxury <br /> Elevate Your Every Step <br /> Where Style Meets Comfort</h1>
						</div>
						<div className="element">
							<p>You will find all the sneakers trending now, available in a limited time. We gathering our product from famous brands and independant creators.</p>
						</div>
						<div className="element_row gap2 w_100">
							<button className='btn btn_base'>Collections</button>
							<button className='btn btn_base_highlight'>All Sale</button>
						</div>
					</div>
					<div className="wrapper_column_center f_basis50">
						<div className="element_column">
							{reviewList()}
						</div>
						<div className="element_start gap2">
							<span className='arrow_btn' onClick={() => setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length)}><ArrowLeft size="2rem" /></span>
							<span className='arrow_btn' onClick={() => {
								if (!currentReview[0]) {
									setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
								} else {
									setCurrentReviewIndex(reviews.length - 1);
								}
							}}><ArrowRight width="2rem" height="2rem" /></span>
						</div>
					</div>
				</div>
			</section >
		</>
	);
}

export default Hero;

import { HalfStar, FullStar, EmptyStar } from '../ui/SvgStack';

export const renderStars = (stars) => {
	const fullStars = Math.floor(stars);
	const hasHalfStar = stars % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<>
			{Array(fullStars)
				.fill(<FullStar />)
				.map((star, index) => (
					<span key={`full-${index}`} className="star_icon full-star">{star}</span>
				))}
			{hasHalfStar && <span className="star_icon half-star"><HalfStar /></span>}
			{Array(emptyStars)
				.fill(<EmptyStar />)
				.map((star, index) => (
					<span key={`empty-${index}`} className="star_icon empty-star">{star}</span>
				))}
		</>
	);
};
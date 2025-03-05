import { HalfStar, FullStar, EmptyStar } from '../ui/SvgStack';

export const renderStars = (stars) => {
	const fullStars = Math.floor(stars);
	const hasHalfStar = stars % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<>
			{Array.from({ length: fullStars }, (_, index) => (
				<span key={`full-${index}`} className="star_icon full-star">
					<FullStar />
				</span>
			))}
			{hasHalfStar && (
				<span className="star_icon half-star">
					<HalfStar />
				</span>
			)}
			{Array.from({ length: emptyStars }, (_, index) => (
				<span key={`empty-${index}`} className="star_icon empty-star">
					<EmptyStar />
				</span>
			))}
		</>
	);
};

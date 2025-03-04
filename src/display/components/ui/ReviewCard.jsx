import React from 'react'

const ReviewCard = ({ stars, average, name, comment, date, review_total, title }) => {
	return (
		<>
			<div id="reviewcard" className="wrapper_column gap1">
				<div className="element_row">
					<span>{stars}</span>
					<p>{average} / {review_total} Reviews</p>
				</div>
				<div className="element">
					<p className='text_size03'><strong>{title}</strong></p>
					<p className='break_word'>{comment}</p>
				</div>
				<div className="element">
					<p className='text_color03'>{name} {date}</p>
				</div>

			</div>

		</>
	)
}

export default ReviewCard
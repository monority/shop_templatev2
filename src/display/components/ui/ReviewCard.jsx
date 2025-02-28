import React from 'react'

const ReviewCard = ({ stars, average, name, comment, date, review_total, title }) => {
	return (
		<>
			<div id="review_card">
				<div className="wrapper">
					<div className="element_row">
						<span>{stars}</span>
						<p>{average} / {review_total} Reviews</p>
					</div>
					<div className="element">
						<p className='text_size03'><strong>{title}</strong></p>
						<p className='break_word'>{comment}</p>
					</div>
					<div className="element">
						<p className='text_color04'>{name} {date}</p>
					</div>

				</div>
			</div>

		</>
	)
}

export default ReviewCard
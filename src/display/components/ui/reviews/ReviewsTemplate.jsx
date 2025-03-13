import React from 'react'


const ReviewsTemplate = ({ message, gender, mark, date, name }) => {
	return (
		<>
			<div id="review">
				<div className="wrapper">
					<div className="wrapper_column gap05">
						<div className="element_row gap1">
							{gender ? (
								"male" && <img src="/img/icons/maleicon.png" className='usericon_image' alt="" />
							) : (
								"female" && <img src="/img/icons/femaleicon.png" className='usericon_image' alt="" />
							)}

							<p>{name}</p>
							<p className='text_color03 text_size01'>{date}</p>
						</div>
						<div className="element">
							<div className='element_star'>{mark}</div>

						</div>
					</div>
					<div className="element">
						{message}
					</div>
					<span className='hr'></span>
				</div>
			</div>
		</>
	)
}

export default ReviewsTemplate
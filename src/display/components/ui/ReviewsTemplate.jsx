import React from 'react'


const ReviewsTemplate = ({ message, gender, mark, date, name }) => {
	return (
		<>
			<div id="review">
				<div className="wrapper">
					<div className="element_between">
						<div className="element">
							{gender ? (
								"male" && <img src="\img\icons\maleicon.png" className='img_user_icon' alt="" />
							) : (
								"female" && <img src="/img/icons/femaleicon.png" className='img_user_icon' alt="" />
							)}

							<p>{name}</p>
						</div>
						<div className="element">
							<div className='element_star'>{mark}</div>
							<p className='text_color04'>{date}</p>
						</div>
					</div>
					<div className="element">
						{message}
					</div>
					<hr />
				</div>
			</div>
		</>
	)
}

export default ReviewsTemplate
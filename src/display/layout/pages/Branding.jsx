import React from 'react'

const Branding = () => {
	return (
		<>
			<section id="branding" className='linear_color'>

				<div className="container_responsive gap2"> 
					<div className="element col">
						<img src="/img/trending/full_sneakers02.webp" alt="" />
						<div className="element_caption">
							<p>On <strong>Sale</strong></p>
							<p>to 80%</p>
						</div>
						<div className="element_caption_top">
							<p className='text_color02 upper'>new arrivals</p>
						</div>
					</div>
					<div className="element col">
						<img src="/img/trending/full_sneakers01.webp" alt="" />
						<div className="element_caption_top">
						<p className='text_color02 upper'>last chance</p>
						</div>
					</div>
					<div className="element col">
						<img src="/img/trending/full_sneakers03.webp" alt="" />
						<div className="element_caption white">
							<p className='text_color02 text_size05'>Exclusive</p>
						</div>
					</div>
				</div>

			</section>
		</>
	)
}

export default Branding
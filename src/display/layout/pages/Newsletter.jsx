import React from 'react'

const Newsletter = () => {
	return (
		<>
			<section id='newsletter'>
				<div className="container_relative">
					<img src="\img\bg_big01.webp" alt="" />
					<div className="img_caption">
						<div className="wrapper_column gap2">
							<div className="element_center w_100">
								<h2>Newsletter</h2>
							</div>
							<form className='form_group wrapper_column gap2'>
								<div className="form_element relative">
									<input type="text" className='input_default' name="newsletter" id="newsletter" defaultValue="" />
									<label htmlFor="newsletter" className='label_default'>
										<svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg> <p>Enter your mail...</p>
									</label>
								</div>
								<div className="form_element w_100">
									<button type="submit" className='btn btn_base w_100'>Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Newsletter
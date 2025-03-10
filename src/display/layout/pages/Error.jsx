import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
	const navigate = useNavigate();
	return (
		<section id="error">
			<div className="lyt_container h_100">
				<div className="container_center h_100">
					<div className="wrapper_column gap4">
						<div className="element_center">
							<h1>Page not Found</h1>
						</div>
						<div className="element_center w_100">
							<button className='btn btn_base' onClick={() => navigate("/")}>Back to Home</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Error
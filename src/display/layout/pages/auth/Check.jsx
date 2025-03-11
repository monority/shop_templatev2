import React from 'react'
import Form from '../../../components/utils/Form'

const Check = () => {
	return (
		<>
			<div id="check">
				<div className="container">
					<div className="container_content">
						<img src="/img/checkbg.jpg" alt="" />
					</div>
					<div className="container_check">
						<div className="wrapper">
							<h1>Check</h1>
						</div>
						<Form inputCount={2} inputTypes={['text', 'password']} inputName={['email', 'password']} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Check
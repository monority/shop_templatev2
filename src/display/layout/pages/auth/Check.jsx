import React from 'react'
import Form from '../../../components/utils/Form'

const Check = () => {
	return (
		<>
			<div id="check">
				<div className="container">
					<div className="container_image">
						<img src="" alt="" />
					</div>
					<div className="container_content">
						<Form inputCount={2} inputTypes={['text', 'password']} inputName={['email', 'password']} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Check
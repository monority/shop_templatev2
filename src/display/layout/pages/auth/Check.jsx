import React, { useEffect, useState } from 'react'
import Form from '../../../components/utils/Form'
import Image from '../../../components/ui/helpers/Image'
import { useLocation, useNavigate } from 'react-router-dom'
import { Apple, Facebook, Google } from '../../../components/ui/SvgStack'
import AuthManagement from '../../../../data/auth/AuthManagement'

const Check = () => {
	const { checkUser } = AuthManagement();
	const navigate = useNavigate();
	const [text, setText] = useState({
		title: 'Hello',
		subtitle: 'Enter your email adress to verify if we have an account registered for you.'
	})
	const location = useLocation();
	const pathCheck = location.pathname === '/auth/check';
	const pathRegister = location.pathname === '/auth/register';
	const pathLogin = location.pathname === '/auth/login';
	const textCondition = () => {
		if (pathCheck) {
			setText({
				title: 'Hello',
				subtitle: 'Enter your email adress to verify if we have an account registered for you.'
			})
		}
		else if (pathRegister) {
			setText({
				title: 'Welcome',
				subtitle: 'Enter your email adress  to create an account.'
			})
		}
		else {
			setText({
				title: 'Welcome back',
				subtitle: 'Enter your email adress and password to login.'
			})
		}
	}
	useEffect(() => {
		textCondition()
	}, [location])

	return (
		<>
			<div id="check">

				<div className="container">
					<div className="container_check pad2">
						<div className="flex">
							<div className="element_center w_100" onClick={() => navigate("/")}>
								<h2 className='cursor_pointer title_size03'>Sneak<strong className='text_color03'>ara</strong>.</h2>

							</div>
						</div>

						<div className="container_column_center h_100">
							<div className="flex column gap4">
								<div className="wrapper_column gap2">
									<div className="element_center w_100">
										<h2 className="title_size03 geist">{text.title}</h2>
									</div>
									<div className="element">
										{<p className='text_size02'>{text.subtitle}</p>}
									</div>
								</div>
								{pathCheck && <Form formAction={() => checkUser()} inputCount={1} inputTypes={['text']} inputName={['email']} buttonName="Next step" btnClass="btn btn_base" />}
								{pathLogin && <Form inputCount={2} inputTypes={['text', 'password']} inputName={['email', 'password']} buttonName="Next step" btnClass="btn btn_base" />}
								{pathRegister && <Form inputCount={4} inputTypes={['text', 'text', 'password', 'password']} inputName={['email', 'username', 'password', 'confirm password']} buttonName="Next step" btnClass="btn btn_base" />}
								<div className="wrapper_column gap4">
									<div className="element_row gap2 w_100">
										<hr />
										<p className='flex' style={{ whiteSpace: 'nowrap' }}>Or Continue with..</p>
										<hr />
									</div>
									<div className="wrapper_row w_100 gap4">
										<div className="element_svg bg_color02">
											<Apple width="2.8rem" height="2.8rem" />
										</div>
										<div className="element_svg bg_color04">
											<Facebook width="2.8rem" height="2.8rem" />
										</div>
										<div className="element_svg">
											<Google width="2.8rem" height="2.8rem" />
										</div>
									</div>

								</div>

							</div>

						</div>
						<div className="wrapper_row">
							<p className='text_color03'>Join millions of fans and get access to reserved products and sales price</p>
						</div>
					</div>
					<div className="container_content">
						<Image path="/img/checkbg03.jpg" alt="Sneakers foot" title="Someone with sneakers on his foot" loading="lazy" />
					</div>

				</div>
			</div>
		</>
	)
}

export default Check
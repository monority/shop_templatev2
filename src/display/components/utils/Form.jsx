import React, { useState } from 'react';
import Input from '../ui/helpers/Input';
const Form = ({ formAction, inputName, inputCount, inputTypes, buttonName, btnClass }) => {

	const inputs = Array.from({ length: inputCount }, (_, index) => (
		<Input key={index} type={inputTypes[index]} name={inputName[index]} value={inputName} />
	));

	return (
		<>
			<form action={formAction}>
				<div className="form_group">
					{inputs}
					<div className="form_element flex">
						<button className={btnClass}>{buttonName}</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default Form;
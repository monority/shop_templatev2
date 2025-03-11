import React, { useState } from 'react';
import Input from '../ui/Input';

const Form = ({ formAction, inputName, inputCount, inputTypes }) => {

	const inputs = Array.from({ length: inputCount }, (_, index) => (
		<Input key={index} type={inputTypes[index]} name={inputName[index]} />
	));

	return (
		<>
			<form action={formAction}>
				<div className="form_group">
					{inputs}
				</div>
			</form>
		</>
	);
};

export default Form;
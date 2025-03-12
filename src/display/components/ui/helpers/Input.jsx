
import React, { useState } from 'react';

const Input = ({ type, initialValue, name, val }) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="form_element relative">
			<input type={type} value={val} name={name} id={name} onChange={handleChange} className='input_default' />
			<label htmlFor={name} className='label_default'>{name}</label>
		</div>
	);
};

export default Input
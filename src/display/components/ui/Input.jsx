
import React, { useState } from 'react';

const Input = ({ type, initialValue, name, val }) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="form_element">
			<input type={type} value={val} name={name} id={name} onChange={handleChange} />
			<label htmlFor={name}></label>
		</div>
	);
};

export default Input
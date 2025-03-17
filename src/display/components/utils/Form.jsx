import React, { useState } from 'react';
import Input from '../ui/helpers/Input';
import Button from '../ui/helpers/Button';
import { useStore } from '../../../cfg/State/Store';
const Form = ({ formAction, inputName, inputCount, inputTypes, buttonName, btnClass }) => {
	const data = useStore((state) => state.data);

	const inputs = Array.from({ length: inputCount }, (_, index) => (
		<Input key={index} type={inputTypes[index]} name={inputName[index]} defValue={data[inputName[index]] || ''}
		/>
	));

	return (
		<>
			<form action={formAction}>
				<div className="form_group">
					{inputs}
					<div className="form_element flex">
						<Button type="submit" className={btnClass}>{buttonName}</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default Form;
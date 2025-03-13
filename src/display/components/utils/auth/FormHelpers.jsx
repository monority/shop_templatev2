

export const handleFormData = ((formData, setData) => {
	const updatedData = {};
	formData.forEach((value, name) => {
		updatedData[name] = value;
	});
	setData(updatedData);
	return updatedData;
}, []);
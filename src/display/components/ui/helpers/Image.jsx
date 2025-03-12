import React from 'react';

const Image = ({ path, alt, title, loading }) => {
	return (
		<img
			src={path}
			alt={alt}
			title={title}
			loading={loading}
		/>
	);
};

export default Image;
import React from "react";

const Popup = ({ isOpen, message, type }) => {
	if (!isOpen) return null;

	const title = type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Notice';

	return (
		<div className="popup_overlay" role="alert">
			<div className={`popup_content popup_${type}`}>
				<div className="element">
					<h3>{title}</h3>
				</div>
				<div className="element">
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
};

export default Popup;
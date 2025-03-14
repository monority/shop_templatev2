import React from "react";

const Popup = ({ isOpen, message, type, onClose }) => {
	if (!isOpen) return null;


	return (
		<div className="popup_overlay" role="alert">
			<div className="popup_content">
				<div className="element">
					<h3>Error</h3>
				</div>
				<div className="element">
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
};

export default Popup;
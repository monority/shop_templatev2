import React from 'react'

export const calculateDate = (date2) => {
	const date1 = new Date();
	const parsedDate2 = new Date(date2);
	const difference_in_time = parsedDate2.getTime() - date1.getTime();
	const difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
	const positive = -difference_in_days;
	if (difference_in_days == 0)
		return `Today`;
	else if (difference_in_days == -1) {
		return `Yesterday`
	}
	else {
		return `${positive} days ago`
	}
};
import React from 'react';
import { useAppStore } from '../../store';

const UserGuard = ({ children, fallback }) => {
	const isAuthenticated = useAppStore(state => state.isAuthenticated);
	const loading = useAppStore(state => state.authLoading);

	if (loading) {
		return null;
	}

	if (fallback) {
		return isAuthenticated ? null : children;
	}

	return isAuthenticated ? children : null;
}

export default UserGuard
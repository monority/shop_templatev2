import React from 'react'
import { useStore } from '../state/Store'

const UserGuard = ({ children, fallback }) => {
	const isAuthenticated = useStore(state => state.isAuthenticated)
	const loading = useStore(state => state.loading)

	if (loading) {
		return null; 
	}

	if (fallback) {
		return isAuthenticated ? null : children;
	}

	return isAuthenticated ? children : null;
}

export default UserGuard
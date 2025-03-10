import React from 'react'

const AppContainer = ({ children }) => {
	return (
		<>
			<main className="app_container">
				{children}
			</main>
		</>
	)
}

export default AppContainer
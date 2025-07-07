import React from 'react'
import { useStore } from '../state/Store'

const UserGuard = ({children}) => {
	const user = useStore(state => state.user)
	return (
	<>
		<div id="user">
			{user && children}
		</div>
	</>
  )
}

export default UserGuard
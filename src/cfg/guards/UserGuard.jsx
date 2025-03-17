import React from 'react'
import { useStore } from '../State/Store'

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
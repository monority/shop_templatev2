import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseCfg';
import { useStore } from './Store';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const setUser = useStore((state) => state.setUser);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				try {
					const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
					if (userDoc.exists()) {
						setUser({ uid: currentUser.uid, ...userDoc.data() });
					} else {
						console.warn('No user data found in Firestore');
						setUser({ uid: currentUser.uid, email: currentUser.email });
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	);
}
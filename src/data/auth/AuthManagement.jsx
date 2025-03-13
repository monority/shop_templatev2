import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../cfg/firebaseCfg';
import { handleFormData } from '../../display/components/utils/auth/FormHelpers';
import { useStore } from '../../cfg/Store'; // Correct import

const AuthManagement = () => {
    const setUser = useStore((state) => state.setUser); // Correct usage
    const errorPop = useStore((state) => state.errorPop);
    const checkUser = async (data) => {
		console.log(data)
        const userList = collection(db, "users");
        try {
            handleFormData( );
            const email_check = data.email;
            const user_check = await getDocs(userList);
            const ArrayData = user_check.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const emails = ArrayData.map((doc) => doc.email);
            const email_verif = emails.filter((email) => email === email_check);
            if (email_verif.length > 0) {
                navigate("/login", { state: data });
            } else {
                navigate("/register", { state: data });
            }
        } catch (err) {
            errorPop(err.code)
            console.error(err);
        }
    };
    const loginUser = async (data) => {
        const updatedData = handleFormData(data);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, updatedData.email, updatedData.password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                setUser({ uid: user.uid, ...userDoc.data() });
                navigate('/todo/addtask');
            } else {
                errorPop('User data not found in database');
            }
        } catch (error) {
            errorPop((error.code));
            console.error('Login Error:', error);
        }
    };
    return {
        loginUser,
        checkUser,
    }
}

export default AuthManagement;
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../../cfg/firebaseCfg';
import { useStore } from '../../cfg/Store';
import { useNavigate } from 'react-router-dom';

const AuthManagement = () => {
    const setUser = useStore((state) => state.setUser);
    const errorPop = useStore((state) => state.errorPop);
	const setData = useStore((state) => state.setData);
    const navigate = useNavigate();

	const handleError = (errorCode) => {
		const errorMessages = {
			'auth/email-already-in-use': "The email address is already in use. Please choose another one.",
			'auth/invalid-email': "The email address entered is invalid.",
			'auth/weak-password': "The password is too weak. Ensure it has at least 8 characters, an uppercase letter, a number, and a special character.",
			'auth/missing-password': "The password is required.",
			'auth/password-does-not-meet-requirements': "The password does not meet the requirements. Ensure it has at least 8 characters, an uppercase letter, a number, and a special character.",
			'auth/invalid-credential': "Credentials does not match",
			"auth/network-request-failed": "Network error, please try again later.",
			"auth/wrong-password": "The password is invalid.",
		};
		return errorMessages[errorCode] || "An error occurred. Please try again.";
	}

    const formDataToObject = (formData) => {
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    };

	const checkUser = async (data) => {
        console.log(data);
        const userList = collection(db, "users");
        try {
            const email = data.get("email")
			const emailSecurity = email.toLowerCase();
            const userCheck = await getDocs(userList);
            const dataArray = userCheck.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const emailsArray = dataArray.map((doc) => doc.email);
            const emailCheck = emailsArray.filter((email) => email === emailSecurity);
            if (emailCheck.length > 0) {
				setData({ email: emailSecurity });
                navigate("/auth/login");
            } else {
				setData({ email: emailSecurity });
                navigate("/auth/register");
            }
        } catch (err) {
            errorPop(handleError(err.code));
        }
    };
    const loginUser = async (data) => {
        try {
            const formData = formDataToObject(data);
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                setUser({ uid: user.uid, ...userDoc.data() });
                navigate('/todo/addtask');
            } else {
                errorPop('User data not found in database');
            }
        } catch (err) {
			errorPop(handleError(err.code));
        }
    };

    const registerUser = async (data) => {
        try {
            const formData = formDataToObject(data);
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                errorPop('User already exists');
                return;
            }
			console.log(data.username)
			if (data.username === '') {
				errorPop('Username is required');
				return;
			}
            await setDoc(userRef, {
                email: user.email,
                _id: user.uid,
                username: formData.username,
            });
            setUser({ _id: user.uid, email: user.email, username: formData.username });
            navigate('/');
        } catch (err) {
			errorPop(handleError(err.code));
        }
    };

    return {
        loginUser,
        checkUser,
        registerUser
    };
};

export default AuthManagement;
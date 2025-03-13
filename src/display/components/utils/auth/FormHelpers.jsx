
import AuthManagement from './../../../../data/auth/AuthManagement';

const FormHelpers = () => {
	const { checkUser } = AuthManagement();
	const handleLogin = (formData) => {
		checkUser(formData);
	}
	return {
		handleLogin
	}
}
export default FormHelpers;
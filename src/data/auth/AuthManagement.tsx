import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';

const FAKE_USERS = [
  { email: 'demo@horlog.com', password: 'demo1234', username: 'demo_user' },
  { email: 'admin@horlog.com', password: 'admin1234', username: 'admin' },
];

const AuthManagement = () => {
  const setUser = useAppStore((state) => state.setUser);
  const showToast = useAppStore((state) => state.showToast);
  const navigate = useNavigate();

  const loginUser = async (data) => {
    const formData = Object.fromEntries(data);
    const match = FAKE_USERS.find(
      (u) => u.email === formData.email?.toLowerCase() && u.password === formData.password
    );
    if (match) {
      setUser({ uid: `fake-${match.username}`, email: match.email, username: match.username, phone: '', address: '', role: 'user', createdAt: new Date().toISOString(), favorites: [] });
      navigate('/');
    } else {
      showToast('Invalid credentials', 'error');
    }
  };

  const registerUser = async (data) => {
    const formData = Object.fromEntries(data);
    if (!formData.username) { showToast('Username is required', 'error'); return; }
    setUser({ uid: `local-${Date.now()}`, email: formData.email, username: formData.username, phone: '', address: '', role: 'user', createdAt: new Date().toISOString(), favorites: [] });
    navigate('/');
  };

  const checkUser = async (_data) => {
    navigate('/login');
  };

  return { loginUser, checkUser, registerUser };
};

export default AuthManagement;

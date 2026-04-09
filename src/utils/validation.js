export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;

export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: emailRegex,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: passwordRegex,
      message: 'Password must contain uppercase, lowercase, number and special character',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: phoneRegex,
      message: 'Invalid phone number',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
};

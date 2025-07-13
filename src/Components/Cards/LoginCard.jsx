import { BookCheckIcon, Eye, EyeOff } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NoteContext } from '../../ContextApi/useContext';
import { loginUser } from '../../Api/userAuthApi';
import { toast } from 'react-toastify';

const LoginCard = () => {
  const { setIsAuth, setAuth_Token } = useContext(NoteContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
    setErrorMsg('');
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await loginUser(formData);
      if (!res.error) {
        // console.log(res.data.token)
        toast.success('Login Successfully!')
        const token = res.data.token
        sessionStorage.setItem('token', token)
        setAuth_Token(token);
        setIsAuth(true);
        navigate('/sidebar/analyze_table');
      } else {
        setErrorMsg(res.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="ml-25 mt-5 sm:mt-10 text-center md:text-left md:mt-20 w-fit text-2xl font-bold text-red-600 ">
        <Link to="/" className="flex gap-2 items-center cursor-pointer">
          <BookCheckIcon size={32} /> InoteBook
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-max my-10 md:my-20">
        {/* LEFT */}
        <div className="flex justify-center items-center px-2 sm:px-4">
          <div className="w-full max-w-md p-8 rounded-xl shadow-md dark:border dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleLoginForm}>
              <p className="text-2xl md:text-4xl font-bold text-black dark:text-white text-center">
                Log in
              </p>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="name@company.com"
                  className={`w-full p-3 rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="••••••••"
                    className={`w-full p-3 pr-10 rounded-md border ${formErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500`}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 dark:text-gray-300"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {formErrors.password && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleOnChange}
                    className="accent-red-500"
                  />
                  Remember me
                </label>
                <Link to="/resetpassword" className="text-red-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {errorMsg && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                  } text-lg font-semibold text-white py-2.5 rounded-md transition-all`}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Not registered?{' '}
                <Link to="/signup" className="text-red-500 hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center">
          <img src="/Images/auth_side_banner.png" alt="Login Banner" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

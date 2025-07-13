import { BookCheckIcon, Eye, EyeOff } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NoteContext } from '../../ContextApi/useContext';
import { createUserWithFetch } from '../../Api/userAuthApi';
import { toast } from 'react-toastify';

const SignupCard = () => {
  const { setAuth_Token, setIsAuth } = useContext(NoteContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({})
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateInputs = () => {
    const error = {}
    const { username, email, password, terms } = formData;
    if (!username.trim()) {
      error.username = 'Username is required!';
    }
    if (!email.trim()) {
      error.email = 'Email is required!'
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.email('Please enter a valid email address.');
    }
    if (!password.trim() && password.length < 6) {
      error.password = 'Password must be at least 6 characters.';
    }
    if (!terms) {
      error.condition = 'You must accept the Terms and Conditions.';
    }
    setFormErrors(error)
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    const { username, email, password } = formData;
    const res = await createUserWithFetch({ username, email, password });

    if (res?.status===200) {
      toast.success('Account created successfully!');
      sessionStorage.setItem('token', res.token)
      setAuth_Token(res.token);
      setIsAuth(true);
      navigate('/sidebar/analyze_table');
    } else {
      toast.error(res?.error || 'Signup failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="ml-25 mt-5 sm:mt-10 md:mt-20 w-fit text-2xl font-bold text-red-600">
        <Link className="flex gap-2 items-center cursor-pointer" to={'/'}>
          <BookCheckIcon size={32} /> InoteBook
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-max my-10 md:my-20">
        <section className="flex items-center justify-center px-2 sm:px-4">
          <div className="w-full rounded-xl shadow-md dark:border dark:border-gray-700 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white text-center">
                Create an account
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="@username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
                  />
                  {formErrors.username && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.username}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
                    />
                    <span
                      className="absolute top-3 right-3 cursor-pointer text-gray-500 dark:text-gray-300"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {formErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 accent-red-500 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                    I accept the{' '}
                    <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-400">
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-lg font-semibold text-white py-2.5 rounded-md transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? 'Creating Account...' : 'Create an account'}
                </button>

                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-red-600 hover:underline dark:text-red-400">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>

        <div className="hidden md:flex items-center justify-center">
          <img src="/Images/signup_side_banner.png" alt="Signup Banner" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default SignupCard;

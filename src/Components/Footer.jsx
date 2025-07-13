import { BookCheckIcon } from 'lucide-react';
import React from 'react';
import { FaFacebook, FaTwitter, FaTiktok, FaLinkedinIn, FaGithub, FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between md:mx-5">
                    <div className="mb-6 md:mb-0">
                        <Link to="/">
                            <div className="mb-5 text-2xl font-semibold text-red-600 flex gap-2 items-center cursor-pointer">
                                <BookCheckIcon size={32} /> InoteBook
                            </div>
                        </Link>

                        <form>
                            <div className="items-center mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                        className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg bg-red-600 sm:rounded-none sm:rounded-r-lg hover:bg-red-700 focus:ring-1 focus:ring-red-800"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <div className="max-w-screen-sm text-sm text-left text-gray-500 dark:text-gray-300">
                                We care about the protection of your data.{' '}
                                <Link to="/privacy-policy" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read our Privacy Policy
                                </Link>.
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Our Pages</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:underline">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/sahil"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline flex items-center gap-2"
                                    >
                                        <FaGithub /> Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://discord.gg/yourinvite"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline flex items-center gap-2"
                                    >
                                        <FaDiscord /> Discord
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/privacy-policy" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {new Date().getFullYear()}{' '}
                        <a href="https://yourdomain.com" className="hover:underline">
                            InoteBook™
                        </a>. All Rights Reserved.
                    </span>
                    <div className="flex gap-5 text-lg mt-4 sm:justify-center sm:mt-0">
                        <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaTwitter />
                        </a>
                        <a href="https://tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaTiktok />
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

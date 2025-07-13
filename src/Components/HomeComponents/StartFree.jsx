import { Link } from "react-router-dom";

const StartFree = () => {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div className="flex flex-col max-w-xl">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white leading-tight">
            Your brain’s for ideas, not remembering 2,974 to-dos
          </p>
          <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 leading-snug mt-4 mb-6">
            Capture all those tasks in Todoist and feel an instant sense of clarity and control.
          </p>
          <Link to="/signup">
            <button className="w-fit px-6 py-3 sm:py-4 rounded-md bg-red-500 text-white text-base sm:text-lg font-bold cursor-pointer hover:scale-105 transition-transform duration-200" >
              Start for free
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            className="rounded-xl w-full max-w-md object-contain"
            src="/Images/first_image.png"
            alt="first img"
          />
        </div>
      </div>

      {/* Section with Background */}
      <div
        className="text-center sm:mt-20 mt-0 sm:py-12 py-6 rounded-xl bg-no-repeat bg-cover px-4 lg:bg-[url('/Images/bg_img.avif')]"
      >

        <div className="my-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
            Welcome to Our Platform
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            We help professionals like you build better, faster, and smarter.
          </p>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col md:flex-row justify-between items-center sm:gap-10 gap-5 mt-10 px-4">
          {/* Testimonial 1 */}
          <div className="text-gray-600 dark:text-gray-300 text-center">
            <p className="text-sm sm:text-base mb-4 italic">“Simple, straightforward, and super powerful”</p>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">THEVERG</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Testimonial 2 */}
          <div className="text-gray-600 dark:text-gray-300 text-center">
            <p className="text-sm sm:text-base mb-4 italic">“The best to-do list app on the market”</p>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">PC</span>
              <span className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">MAG</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Testimonial 3 */}
          <div className="text-gray-600 dark:text-gray-300 text-center">
            <p className="text-sm sm:text-base mb-4 italic">“Nothing short of stellar”</p>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">techRadar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartFree;

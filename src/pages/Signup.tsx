import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../axios/axios";
import { useState } from "react"; // Import useState
import { Link } from "react-router";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false); // Loading state
  const [serverError, setServerError] = useState<string | null>(null); // Server error state
  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true); // Set loading to true
    setServerError(null); // Reset server error

    axiosInstance
      .post("/auth/signup", data)
      .then((res) => {
        console.log(res?.data);
        const LOCALSTORAGE_NAME = import.meta.env.VITE_LOCALSTORAGE_NAME;
        localStorage.setItem(LOCALSTORAGE_NAME, res.data.token);
      })
      .catch((err) => {
        console.log(err);
        // Set server error message if available
        if (err.response && err.response.data && err.response.data.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#890000]">Create Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#890000] mb-1">Username</label>
            <input
              {...register("username", { required: true, minLength: 3, maxLength: 36 })}
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
            />
            {errors.username?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">Username must be at least 3 characters</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="text-red-500 text-xs mt-1">Username must be at most 36 characters</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#890000] mb-1">Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#890000] mb-1">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
            />
            {errors.password?.type === "required" && (
              <p className=" text-red-500 text-xs mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#890000] mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
            />
            {errors.confirmPassword?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Please confirm your password</p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Server Error Message */}
          {serverError && (
            <p className="text-red-700 mt-1 text-center font-semibold bg-red-100 p-2 rounded-full">{serverError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-[#890000] text-white py-2 rounded-xl font-semibold hover:bg-[#6f0000] transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-[#890000] font-semibold">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
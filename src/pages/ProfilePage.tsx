import { useForm } from "react-hook-form";
import { useState } from "react";
import { User2, Eye, EyeOff } from "lucide-react";
import useProfile from "../hooks/useProfile";
import axiosInstance from "../axios/axios";

interface PasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {

  const { profile } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormInputs>();

  const [formMessage, setFormMessage] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data: PasswordFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      setFormMessage("New passwords do not match.");
      return;
    }

    axiosInstance
      .put("/auth/password", data)
      .then(() => {
        setFormMessage("✅ Password updated successfully!, Login with new password");
        // Redirect to login page
        setTimeout(() => {
          localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_NAME);
          window.location.href = "/login";
        }, 5000)
      })
      .catch((error) => {
        setFormMessage(error?.response?.data?.message);
      })
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* Profile Header */}
      <div className="flex items-center bg-white p-6 rounded-xl shadow-md">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <User2 className="w-10 h-10 text-gray-500" />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-800">{profile?.username}</h2>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>
      </div>

      {/* Update Password Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Password</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.current ? "text" : "password"}
                {...register("currentPassword", { required: "Current password is required" })}
                className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-[#890000]/50 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => toggleVisibility("current")}
              >
                {showPassword.current ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
                className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-[#890000]/50 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => toggleVisibility("new")}
              >
                {showPassword.new ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.confirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                })}
                className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-[#890000]/50 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => toggleVisibility("confirm")}
              >
                {showPassword.confirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Feedback */}
          {formMessage && (
            <div className="text-sm font-medium mt-2 text-center text-[#890000]">
              {formMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#890000] hover:bg-[#6f0000] text-white px-6 py-2 rounded-xl font-semibold transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

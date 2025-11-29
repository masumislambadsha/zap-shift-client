import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, signInGoogle, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );

      const photoURL = uploadRes.data.data.url;

      await registerUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL });

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Welcome to ZapShift!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          (err.code === "auth/email-already-in-use"
            ? "Email already registered"
            : "Registration failed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "",
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.post("/users", userInfo);
      toast.success("Signed up with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-linear-to-r from-[#b0e413] to-primary/80 text-secondary p-10 text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H9a4 4 0 01-4-4v-1a4 4 0 014-4h6a4 4 0 014 4v1a4 4 0 01-4 4z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold">Join ZapShift</h1>
            <p className="mt-3 text-secondary/90 text-lg">
              Create your account in seconds
            </p>
          </div>

          <div className="p-8 pt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full h-14 rounded-xl text-lg focus:ring-4 focus:ring-lime-200 focus:border-[#b0e413] transition-all outline-0"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: "Photo is required" })}
                  className="file-input file-input-bordered w-full rounded-xl h-14 focus:ring-4 focus:ring-lime-200 outline-0"
                />
                {errors.photo && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                  className="input input-bordered w-full h-14 rounded-xl text-lg focus:ring-4 focus:ring-lime-200 focus:border-[#b0e413] transition-all outline-0"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        message:
                          "Must include uppercase, lowercase, number & special char",
                      },
                    })}
                    className="input input-bordered w-full h-14 rounded-xl text-lg pr-12 focus:ring-4 focus:ring-lime-200 focus:border-[#b0e413] transition-all outline-0"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPass ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="input input-bordered w-full h-14 rounded-xl text-lg pr-12 focus:ring-4 focus:ring-lime-200 focus:border-[#b0e413] transition-all outline-0"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPass ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-lg bg-linear-to-r from-[#b0e413] to-primary/80 hover:from-[#a0d010] hover:to-primary text-secondary font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="flex items-center my-10">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-6 text-gray-500 font-bold bg-white">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-4 px-8 py-5 cursor-pointer
                         bg-white border-2 border-gray-300 rounded-2xl
                         text-gray-800 font-bold text-lg
                         shadow-lg hover:shadow-2xl
                         transition-all duration-300
                         hover:border-[#b0e413] hover:bg-linear-to-r hover:from-[#b0e413]/5 hover:to-primary/5
                         active:scale-98"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#b0e413] to-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>

              <FcGoogle size={30} className="drop-shadow-md" />
              <span className="relative">Continue with Google</span>

              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-[#b0e413] to-primary opacity-0 group-hover:opacity-30 blur-xl transition-opacity"></div>
            </button>

            <p className="text-center mt-10 text-gray-700 text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ from: location.state }}
                className="font-bold text-[#b0e413] hover:underline transition"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm">
            © 2025 <span className="font-bold text-[#b0e413]">ZapShift</span> •
            Fastest Parcel Delivery in Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

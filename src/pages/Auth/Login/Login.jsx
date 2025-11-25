import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message.includes("wrong-password")
          ? "Incorrect password"
          : "Invalid email or password");
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        // Save user to DB (only if new)
        axiosSecure.post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              toast.success("Account created & logged in!");
            } else {
              toast.success("Welcome back!");
            }
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        toast.error("Google login failed. Try again.", err);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-linear-to-r from-[#b0e413] to-primary/80 text-secondary p-8 text-center">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="mt-2 text-secondary/90">Login to continue delivering with ZapShift</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full h-12 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  className="input input-bordered w-full h-12 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-red-600 hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full btn btn-lg bg-linear-to-r from-[#b0e413] to-primary/80 hover:bg-primary  text-secondary font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                Login Now
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 font-medium bg-white">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full btn btn-outline hover:bg-red-50 hover:border-red-400 flex items-center justify-center gap-3 text-lg font-medium transition-all"
            >
              <FcGoogle size={26} />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center mt-8 text-gray-600">
              New to ZapShift?{" "}
              <Link
                to="/register"
                state={location.state}
                className="font-bold text-blue-500 hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 ZapShift • Fastest Delivery in Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

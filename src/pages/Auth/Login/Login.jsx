import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();

  const { signInUser, signInGoogle } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Logged In Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
        toast.success("Logged In Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <h3 className="text-3xl text-center font-medium">Welcome Back </h3>
        <p className="text-center font-medium">Please Login</p>
        <form onSubmit={handleSubmit(handleLogin)} class="card-body">
          <fieldset class="fieldset">
            <label class="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              class="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email Is Required</p>
            )}
            <label class="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              class="input"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password Must Be At Least 6 Digit</p>
            )}
            <div>
              <a class="link link-hover">Forgot password?</a>
            </div>
            <button class="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p className="text-sm ">
            New To zapShift?{" "}
            <Link className="underline text-blue-500" state={location?.state} to={"/register"}>
              Register
            </Link>{" "}
          </p>
        </form>
        <p className="text-center -mt-[15px] mb-2">OR</p>
        <button
          onClick={handleGoogleSignIn}
          class="btn bg-white text-black border-[#e5e5e5] mb-6"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

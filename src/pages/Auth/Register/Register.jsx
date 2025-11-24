import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { registerUser, signInGoogle, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegistration = (data) => {
    setLoading(true);

    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios
          .post(image_Api_Url, formData)
          .then((res) => {
            const photoURL = res.data.data.url;
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };

            axiosSecure
              .post("/users", userInfo)
              .then((res) => {
                setLoading(false); // End loading
                if (res.data.insertedId) {
                  toast.success("Registration Successful");
                  navigate(location?.state || "/");
                }
              })
              .catch((err) => {
                setLoading(false);
                toast.error("User registration failed!");
                console.log(err);
              });

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            updateUserProfile(userProfile)
              .then(() => console.log("user profile updated"))
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("User data has been stored in DB", res.data);
            navigate(location?.state || "/");
            toast.success("Registered With Google Successfully");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h3 className="text-3xl text-center font-medium">Welcome To Zap Shift</h3>
      <p className="text-center font-medium">Please Register</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Name Is Required</p>
          )}
          <label className="label">Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-600">Photo Is Required</p>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email Is Required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password Is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">At Least 6 Digit Password</p>
          )}
          <button className="btn btn-neutral mt-4" disabled={loading}>
            {loading ? (
              <>
                <span className="loader mr-2"></span> Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </fieldset>

        <p className="text-sm ">
          Already have an account{" "}
          <Link
            className="underline text-blue-500"
            state={location.state}
            to={"/login"}
          >
            Login
          </Link>{" "}
        </p>
      </form>
      <p className="text-center -mt-[15px] mb-2">OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] mb-6"
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
      {/* Loader CSS below */}
      <style>
        {`
          .loader {
            border: 3px solid #e0e0e0;
            border-top: 3px solid #76c7c0;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: inline-block;
            animation: spin 1s linear infinite;
            vertical-align: middle;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;

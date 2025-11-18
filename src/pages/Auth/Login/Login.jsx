import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result =>{
      console.log(result.user)
    })
    .catch(err=>{
      console.log(err);

    })
  };
  return (
    <div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
        </form>
      </div>
    </div>
  );
};

export default Login;

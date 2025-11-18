import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register,} = useForm()

  const handleLogin = () =>{
    
  }
  return (
    <div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form class="card-body">
          <fieldset class="fieldset">
            <label class="label">Email</label>
            <input type="email" {...register("email")} class="input" placeholder="Email" />
            <label class="label">Password</label>
            <input type="password" {...register("password")} class="input" placeholder="Password" />
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

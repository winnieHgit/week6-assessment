import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRouter } from "next/router";

//create a ligin validator
const LoginFromValidator = z
  .object({
    username: z.string().nonempty().min(5),
    password: z.string().min(10),
  })
  .strict();

// Validation on the response from backend when creating token
const TokenFromLoginValidator = z.object({
  token: z.string().nonempty(),
});

//get the type from the validator
type LoginForm = z.infer<typeof LoginFromValidator>;

const LoginPage = () => {
  const router = useRouter();

  const getLogin = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://127.0.0.1:3007/login", data);
      //validate the response from backend - expected a token
      const validated = TokenFromLoginValidator.safeParse(response.data);
      if (validated.success) {
        // Store the token since it is there in the response
        localStorage.setItem("token", response.data.token);

        router.push("/progress");
      } else {
        // Validation parser failed, so probably there is a message error in the body
        // therefore just log it
        console.log("Failed to login with response", response);
      }
    } catch (error) {
      console.log("fail to login - error:", error);
    }
  };

  const handleLoginSubmit = (data: LoginForm) => {
    console.log("Sent data to login: ", data);
    getLogin(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFromValidator),
  });

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="login-form-element">
            <label htmlFor="loginUsername">🖊 Username</label>
            <input
              id="loginUsername"
              type="text"
              placeholder="Username"
              {...register("username")}
            ></input>
            {errors.username && (
              <p className="error-msg">{errors.username.message} </p>
            )}
          </div>
          <div className="login-form-element">
            <label htmlFor="loginPassword">🔓 Password</label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Password"
              {...register("password")}
            ></input>
            {errors.password && (
              <p className="error-msg">{errors.password.message} </p>
            )}
          </div>
          <button className="login-button" type="submit">
            <h2>Login</h2>
          </button>
        </form>
      </div>
    </>
  );
};
export default LoginPage;

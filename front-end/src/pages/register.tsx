import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import axios from "axios";

const RegisterFromValidator = z.object({
  username: z.string().min(5),
  password: z.string().min(10),
});

type RegisterFrom = z.infer<typeof RegisterFromValidator>;

export default function RegisterationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFrom>({ resolver: zodResolver(RegisterFromValidator) });

  const router = useRouter();
  const handleRegistrationForm = async (data: RegisterFrom) => {
    console.log("clicked");
    try {
      const response = await axios.post("http://127.0.0.1:3007/register", {
        username: data.username,
        password: data.password,
      });
      console.log(data);
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <main>
      <h1>Registeration Form</h1>
      <div>
        <form id="sign-up-form" onSubmit={handleSubmit(handleRegistrationForm)}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")}></input>
          {errors.username && (
            <p className="error-msg">
              Username error: {errors.username.message}{" "}
            </p>
          )}

          <label htmlFor="password">Password</label>
          <input type="text" id="password" {...register("password")}></input>
          {errors.password && (
            <p className="error-msg">
              Password error: {errors.password.message}{" "}
            </p>
          )}

          <button type="submit">Sign up</button>
        </form>
      </div>
    </main>
  );
}

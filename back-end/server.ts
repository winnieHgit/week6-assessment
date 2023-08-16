import express from "express";
import { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { AuthMiddleware, AuthRequest } from "./auth/middleware";
import { toToken } from "./auth/jwt";
import { z } from "zod";

const app = express();

app.use(json());
app.use(cors());
const port = 3007;

const prisma = new PrismaClient();

app.listen(port, () => {
  console.log(`⚡ Listening on port: ${port}`);
});

//POST "/register"
const RegistrationFormValidator = z.object({
  username: z.string().min(5),
  password: z.string().min(10),
});

app.post("/register", async (request, response) => {
  const requestBody = request.body;
  const parsedBody = RegistrationFormValidator.safeParse(requestBody);
  if (parsedBody.success) {
    try {
      const newUser = await prisma.user.create({
        data: parsedBody.data,
      });
      response.status(201).send(newUser);
    } catch (error) {
      response.status(500).send({ message: "Something went wrong" });
    }
  } else {
    response.status(400).send(parsedBody.error.flatten());
  }
});

//GET user
app.get("/users", async (request, response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
  response.send(users);
});

//POST "/login"
const LoginFormValidator = z
  .object({
    username: z.string().nonempty().min(5),
    password: z.string().min(10),
  })
  .strict();

app.post("/login", async (request, response) => {
  const requestBody = request.body;
  const parsedBody = LoginFormValidator.safeParse(requestBody);

  if (parsedBody.success) {
    try {
      const userToLogin = await prisma.user.findUnique({
        where: {
          username: requestBody.username,
        },
      });
      if (userToLogin && userToLogin.password === requestBody.password) {
        const token = toToken({ userId: userToLogin.id });
        response.status(200).send({ token: token });
        return;
      }
      // If we didn't find the user or the password doesn't match, send back an error message
      response.status(400).send({ message: "Login failed" });
    } catch (error) {
      // If we get an error, send back HTTP 500 (Server Error)
      response.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    response.status(400).send(parsedBody.error.flatten());
  }
});
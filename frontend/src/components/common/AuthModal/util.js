import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Please enter email." })
    .email({ message: "Not correct email id." }),
  password: z
    .string({
      required_error: "Please enter categories of id.",
    })
    .min(6, { message: "Min at least 6 character password" }),
});

export const registerFormSchema = z.object({
  name: z
    .string({ required_error: "Please enter your full name" })
    .min(3, { message: "Min at least 3 character name" }),
  email: z
    .string({ required_error: "Please enter email." })
    .email({ message: "Not correct email id." }),
  password: z
    .string({
      required_error: "Please enter categories of id.",
    })
    .min(6, { message: "Min at least 6 character password" }),
});

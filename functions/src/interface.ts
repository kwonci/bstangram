import * as yup from "yup";

export type SignupRequest = {
  body: {
    email: string;
    handle: string;
    password: string;
  }
};

export const signupRequestSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    handle: yup.string().required(),
    password: yup.string().required()
  })
});

export type LoginRequest = {
  body: {
    email: string;
    password: string;
  }
};

export const LoginRequestSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
});

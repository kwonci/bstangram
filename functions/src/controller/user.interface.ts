import * as yup from "yup";
import { Request } from 'express';

export interface SignupRequestBody {
  email: string;
  handle: string;
  password: string;
};

export type SignupRequest = Request<{}, {}, SignupRequestBody>;

export const SignupRequestSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    handle: yup.string().required(),
    password: yup.string().required()
  })
});

export interface SigninRequestBody {
  email: string;
  password: string;
}

export type SigninRequest = Request<{}, {}, SigninRequestBody>;

export const SigninRequestSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
});

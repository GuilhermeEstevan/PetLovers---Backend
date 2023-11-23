export type TRegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type TLoginUserRequest = {
  email: string;
  password: string;
};

export type TRegisterUserResponse = {
  email: string;
  name: string;
  lastName: string;
  phone: string;
  token: string;
};

export type TLoginUserResponse = {
  email: string;
  name: string;
  lastName: string;
  phone: string;
  token: string;
};

export type TUpdateUserRequest = {
  email: string;
  lastName: string;
  name: string;
  phone: string;
};

export type TUpdateUserResponse = {
  email: string;
  lastName: string;
  name: string;
  phone: string;
  token: string;
};

export type TEmailRequest = {
  to: string;
  subject: string;
  text: string;
};

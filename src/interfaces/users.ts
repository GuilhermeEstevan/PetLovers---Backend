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

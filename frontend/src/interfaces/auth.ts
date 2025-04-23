export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface FormDataLogin {
  email: string;
  password: string;
}

export interface FormDataForgotPassword {
  email: string;
}

export interface FormDataResetPassword {
  password: string;
  confirmPassword?: string;
}

export interface CheckToken {
  id: any;
  token: any;
}

export interface FormInputProps {
  labelProp?: string;
  nameProp: string;
  placeholder?: string;
  requiredProp: boolean;
  control: any;
  errors: any;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  watch?: (name: string) => any;
  showValidation?: boolean;
  value?: string;
  type?: string;
  tag?: string;
}

export interface User {
  email: string;
  name: string;
  profilePic: string;
  role: string;
  _id: string;
}

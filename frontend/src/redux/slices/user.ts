import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces/common";

const initialState: UserState = {
  token: "",
  user: {
    _id: "",
    name: "",
    email: "",
    role: "",
    profilePic: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLogin: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          _id: string;
          name: string;
          profilePic: string;
          email: string;
          role: string;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
    },
    removeLogin: (state) => {
      state.token = "";
      state.user = {
        _id: "",
        name: "",
        email: "",
        role: "",
        profilePic: "",
      };

      localStorage.removeItem("token");
    },
  },
});

export const { saveLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;

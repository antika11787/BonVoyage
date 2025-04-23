import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState } from "../../interfaces/common";

const initialState: CategoryState = {
  _id: "",
  title: "",
  icon: "",
  color: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    saveCategory: (
      state,
      action: PayloadAction<{
        _id?: string;
        title?: string;
        icon?: string;
        color?: string;
      }>
    ) => {
      state._id = action.payload._id ?? state._id;
      state.title = action.payload.title ?? state.title;
      state.icon = action.payload.icon ?? state.icon;
      state.color = action.payload.color ?? state.color;
    },
    removeCategory: (state) => {
      state._id = "";
      state.title = "";
      state.icon = "";
      state.color = "";
    },
  },
});

export const { saveCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;

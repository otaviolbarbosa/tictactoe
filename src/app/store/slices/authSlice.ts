"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth";
import { RootState } from "..";

interface AuthState {
  user?: User;
}
const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAuthenticatedUser: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { addAuthenticatedUser } = authSlice.actions;

export const userSelector = ({ auth }: RootState) => auth.user

export default authSlice.reducer;

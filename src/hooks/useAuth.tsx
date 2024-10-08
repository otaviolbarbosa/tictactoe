"use client";

import { userSelector } from "@/app/store/slices/authSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addAuthenticatedUser } from "@/app/store/slices/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { User } from "@/types/auth";

const useAuth = () => {
  const { data: session } = useSession();
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const fetchUserData = async () => {
    const userResponse = await fetch(`/api/users/${session?.user?.email}`);

    const { user } = await userResponse.json();
    dispatch(addAuthenticatedUser(user as User));
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);
  return {
    user,
  };
};

export default useAuth;

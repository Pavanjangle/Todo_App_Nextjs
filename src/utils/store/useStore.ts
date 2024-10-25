import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./userSlice";

export const useStore = create<UserSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
    }),
    {
      name: "app-storage",
    }
  )
);

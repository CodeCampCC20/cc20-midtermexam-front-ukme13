import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => {
    set({ token });
  },
  username: null,
  setUsername: (name) => {
    set({ username : name })
  }
}));

export default useAuthStore;

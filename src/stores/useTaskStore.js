import taskApi from "../api/taskApi";
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  actionFetchTask: async (token) => {
    try {
      const res = await taskApi.getAllTaskByUserID(token);
      console.log("taskApi res:", res.data.todos);
      console.log("taskApi DATA res:", res);

      set({ tasks: res.data.todos });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTaskStore;

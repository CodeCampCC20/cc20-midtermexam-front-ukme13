import * as Yup from "yup";
import { useEffect, useState } from "react";
import { schemaTask } from "../validator/schemaTask";
import useAuthStore from "../stores/useAuthStore";
import { Loader2Icon, Rocket, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import InputFormTodo from "../components/form/inputForm_todo";
import taskApi from "../api/taskApi";
import useTaskStore from "../stores/useTaskStore";

const InitialInput = {
  taskName: "",
  userId: 41,
};

function ToDoList() {
  const token = useAuthStore((state) => state.token);
  console.log("token :", token);

  const [input, setInput] = useState(InitialInput);
  const [inputError, setInputError] = useState(InitialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

  // const navigate = useNavigate();

  const tasks = useTaskStore((state) => state.tasks);
  const actionFetchTask = useTaskStore((state) => state.actionFetchTask);
  console.log("tasks2: ", tasks);

  useEffect(() => {
    actionFetchTask(token);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleDelete = async (taskId) => {
    try {
      // e.preventDefault()
      setIsLoadingDel(true);
      await taskApi.deleteTask(taskId, token);
      await actionFetchTask(token);

      toast.success("Delete success!!");
    } catch (error) {
      console.log("ToDoList error", error);
      toast.error("Delete invalid!!");
    } finally {
      setIsLoadingDel(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("input: ", input);
      setIsLoading(true);

      //validate
      schemaTask.validateSync(input, { abortEarly: false });

      //api
      const res = await taskApi.createTask(input, token);
      await actionFetchTask(token);

      setInput(InitialInput);

      //toast
      toast.success("Add a new task success!");
    } catch (error) {
      console.log(error);
      toast.error("Task invalid!!");

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheck = async (e, task) => {
    const input = {
      taskName: task.taskName,
      completed: e.target.checked,
    };

    try {
      // console.log(e.target.checked);
      await taskApi.updateTask(task.id, input, token);
      await actionFetchTask(token);
      toast.success("Update success!!");
    } catch (error) {
      console.log("ToDoList error", error);
      toast.error("Update invalid!!");
    } finally {
      setIsLoadingDel(false);
    }
  };

  return (
    <div className="container bg-linear-to-t from-[#1f1c3b] to-[#3b2569]">
      <div className="flex flex-col box boxTodo">
        <div className="flex items-center mb-4">
          <h1 className="w-full mb-2">My todo</h1>
          <Rocket
            className="w-12 h-12 p-2 bg-white/10 rounded-xl"
            strokeWidth={2}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="w-full">
            <InputFormTodo
              className="w-full "
              text=""
              icon="null"
              handleChange={handleChange}
              value={input.taskName}
              placeholder="new task"
              type="text"
              id="taskName"
              error={inputError.taskName}
            />
          </div>
          <button disabled={isLoading} className="btn btn-primary h-14 w-30">
            {isLoading ? (
              <>
                <Loader2 className="" strokeWidth={2} />
                <span>Loading...</span>
              </>
            ) : (
              <>
                {/* <Loader2 className="" strokeWidth={2} /> */}
                <span>Add</span>
              </>
            )}
          </button>
        </form>
        <div className="flex flex-col gap-4 ">
          {tasks.map((item) => (
            <form className="flex gap-3 items-center" key={item.id}>
              <input
                type="checkbox"
                onChange={(e) => handleCheck(e, item)}
                checked={item.completed ? true : false}
                className="checkbox"
                id = {item.id}
              />
              <label
                htmlFor={item.id}
                key={item.id}
                className={`w-full text-xl ${
                  item.completed ? "line-through text-white/50" : ""
                }`}
              >
                {item.taskName}
              </label>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={isLoadingDel}
                className="cursor-pointer flex items-center justify-center w-12 h-9 rounded-full hover:bg-red-500 transition-[0.3s]"
              >
                {isLoadingDel ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <X className="" />
                )}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;

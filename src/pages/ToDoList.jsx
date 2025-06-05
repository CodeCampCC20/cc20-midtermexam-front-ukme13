import * as Yup from "yup";
import { useEffect, useState } from "react";
import { schemaTask } from "../validator/schemaTask";
import useAuthStore from "../stores/useAuthStore";
import { Loader2Icon, Rocket, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import InputForm from "../components/form/InputForm";
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
    <div className="container">
      <div className="flex flex-col box">
        <div className="flex items-center">
          <h1 className="w-full mb-2">My todo</h1>
          <Rocket className="w-8 h-8" strokeWidth={2} />
        </div>
        <form onSubmit={handleSubmit} className="flex h-14 mb-6 w-full">
          <InputForm
            className="w-full"
            text=""
            icon="null"
            handleChange={handleChange}
            value={input.taskName}
            placeholder="new task"
            type="text"
            id="taskName"
            error={inputError.taskName}
          />
          <button disabled={isLoading} className="btn btn-primary h-full w-16">
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
        {tasks.map((item) => (
          <div className="flex" key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => handleCheck(e, item)}
              checked={item.completed ? true : false}
            />
            <div
              key={item.id}
              className={`${item.completed ? "line-through" : ""}`}
            >
              {item.taskName}
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={isLoadingDel}
              className=""
            >
              {isLoadingDel ? (
                <Loader2Icon className="h-5 w-5 animate-spin" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;

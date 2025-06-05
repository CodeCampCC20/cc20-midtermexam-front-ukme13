import * as Yup from "yup";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schemaLogin } from "../validator/schemaRegister";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import InputForm from "../components/form/InputForm";
import { Key, KeyRound, Loader2, User } from "lucide-react";

const InitialInput = {
  username: "",
  password: "",
};

function LoginPage() {
  const [input, setInput] = useState(InitialInput);
  const [inputError, setInputError] = useState(InitialInput);
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("input: ", input);
      setIsLoading(true);

      //validate
      schemaLogin.validateSync(input, { abortEarly: false });

      //api
      const res = await authApi.login(input);
      console.log('Your Token : ',res.data.accessToken);
      userLogin(res.data.accessToken);

      setInput(InitialInput);
      navigate("/todolist");

      //toast
      toast.success("Login success!");
    } catch (error) {
      console.log(error);
      toast.error("Login invalid!!");

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

  return (
    <div className="container">
      <div className="box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="">
          <InputForm
            text="username"
            icon={User}
            handleChange={handleChange}
            value={input.username}
            placeholder="username"
            type="text"
            id="username"
            error={inputError.username}
          />

          <InputForm
            text="password"
            icon={KeyRound}
            handleChange={handleChange}
            value={input.password}
            placeholder="password"
            type="text"
            id="password"
            error={inputError.password}
          />

          <button disabled={isLoading} className="btn btn-primary">
            {isLoading ? (
              <>
                <Loader2 className="" strokeWidth={2} />
                <span>Loading...</span>
              </>
            ) : (
              <>
                {/* <Loader2 className="" strokeWidth={2} /> */}
                <span>Login</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

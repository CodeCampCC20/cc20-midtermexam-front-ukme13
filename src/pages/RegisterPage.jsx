import * as Yup from "yup";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schemaRegister } from "../validator/schemaRegister";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import InputForm from "../components/form/InputForm";
import { Key, KeyRound, Loader2, User } from "lucide-react";

const InitialInput = {
  username: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [input, setInput] = useState(InitialInput);
  const [inputError, setInputError] = useState(InitialInput);
  const [isLoading, setIsLoading] = useState(false);

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
      schemaRegister.validateSync(input, { abortEarly: false });

      //api
      const res = await authApi.register(input);
      console.log(res.data.accessToken);

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
        <h1 className="mb-4">Register</h1>

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

          <InputForm
            text="Confirm Password"
            icon={KeyRound}
            handleChange={handleChange}
            value={input.confirmPassword}
            placeholder="confirmPassword"
            type="text"
            id="confirmPassword"
            error={inputError.confirmPassword}
          />

          <button disabled={isLoading} className="mybtn">
            {isLoading ? (
              <>
                <Loader2 className="" strokeWidth={2} />
                <span>Loading...</span>
              </>
            ) : (
              <>
                {/* <Loader2 className="" strokeWidth={2} /> */}
                <span>Register</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

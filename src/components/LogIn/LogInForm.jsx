import React, { useContext } from "react";
import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import "./logIn.css";
import axios from "axios";
import { UserContext } from "../../context/Context";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const navigateHandle = (path) => {
    navigate(path);
  };

  const inputsList = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: false,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should contain 8 characters with one capital letter, one number and one special character!",
      label: "Password",
      required: false,
    },
  ];

  const onChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/library-app/loginus.php",
        {
          uid: values.username,
          pwd: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        await setCurrentUser(response.data);
        console.log(response.data, currentUser);
        navigateHandle("/bookreservation");
      } else {
        setError("There was a problem getting your account. Please try again.");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Welcome to this address book app!</h3>
      <p>Please sing in to continue!</p>
      <form onSubmit={handleLogin} className="formLogin">
        {inputsList.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChangeValue}
          />
        ))}
        <button type="submit" className="logInBtn" name="submit">
          Submit
        </button>
      </form>
      <button
        type="button"
        className="switchBtn"
        onClick={() => navigateHandle("/register")}
      >
        Don't have account?
      </button>
    </div>
  );
};

export default LoginForm;

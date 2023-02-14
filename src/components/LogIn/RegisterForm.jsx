import React, { useContext } from "react";
import { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./logIn.css";
import { UserContext } from "../../context/Context";

const RegisterForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      errorMessage:
        "Username should contain 4-16 characters with no special characters!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{4,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "We neeed a valid e-mail adress!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should contain 8 characters with one capital letter, one number and one special character!",
      label: "Password",
      pattern:
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      uid: values.username,
      pwd: values.password,
      pwdrepeat: values.confirmPassword,
      email: values.email,
    };
    try {
      const response = await axios.post(
        "http://localhost:80/library-app/registerus.php",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setCurrentUser(user);
        navigateHandle("/bookreservation");
      } else {
        setError(
          "There was a problem creating your account. Please try again later."
        );
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Welcome to this library app!</h3>
      <p>Please sing up to continue!</p>
      <form onSubmit={handleRegister}>
        {inputsList.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChangeValue}
          />
        ))}
        <button type="submit" name="submit" className="logInBtn">
          Submit
        </button>
      </form>
      <button
        type="button"
        className="switchBtn"
        onClick={() => navigateHandle("/")}
      >
        Already have an account?
      </button>
    </div>
  );
};

export default RegisterForm;

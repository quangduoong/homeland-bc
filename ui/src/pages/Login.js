import React, { useContext, useState } from "react";
import swal from "sweetalert2";
import Button from "../components/Button";
import InputForm from "../components/InputForm";
import { AuthContext } from "../context/Auth/AuthContextProvider";

const Login = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  // form data
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPass: "",
    name: "",
  });
  const { email, password, confirmPass } = form;
  // context data
  const { logIn, signUp } = useContext(AuthContext);

  // * Log In
  const handleOnLogIn = async (event) => {
    event.preventDefault();

    if (!email || !password)
      return await swal.fire({
        icon: "warning",
        title: "Not enough information",
        showConfirmButton: false,
        timer: 1500,
      });
    const res = await logIn({ email, password });

    if (res.success) {
      await swal.fire({
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/";
    } else return swal.fire({ icon: "error", title: res.message });
  };

  // * Sign Up
  const handleOnSignUp = async (event) => {
    event.preventDefault();

    if (Object.values(form).some((item) => !item))
      return await swal.fire({
        icon: "warning",
        title: "Not enough information",
        showConfirmButton: false,
        timer: 1500,
      });

    if (password !== confirmPass)
      return await swal.fire({
        icon: "warning",
        title: "Unmatched passwords",
        showConfirmButton: false,
        timer: 1500,
      });

    const res = await signUp(form);

    if (res.success) {
      await swal.fire({
        icon: "success",
        title: "Sign up successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/";
    } else return swal.fire({ icon: "error", title: res.message });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white py-3">
      <div className="mx-auto my-[70px] lg:max-w-xl w-[600px] p-[30px] rounded-md shadow-xl">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Sign up" : "Sign in"}
        </h3>
        <div className="w-full flex flex-col gap-5">
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Email"}
            value={form.email}
            setValue={setForm}
            keyPayload={"email"}
          />
          {isRegister && (
            <>
              {" "}
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={"Name"}
                value={form.name}
                setValue={setForm}
                keyPayload={"name"}
              />
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={"Number"}
                value={form.phone}
                setValue={setForm}
                keyPayload={"phone"}
              />{" "}
            </>
          )}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Password"}
            value={form.password}
            setValue={setForm}
            keyPayload={"password"}
            type="password"
          />
          {isRegister && (
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Confirm Password"}
              value={form.confirmPass}
              setValue={setForm}
              keyPayload={"confirmPass"}
              type="password"
            />
          )}

          <Button
            text={isRegister ? "Sign up" : "Sign in"}
            bgColor="bg-violet-700"
            textColor="text-white"
            fullWidth
            onClick={isRegister ? handleOnSignUp : handleOnLogIn}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Do you have an account?{" "}
              <span
                onClick={() => {
                  setIsRegister(false);
                  setForm({
                    email: "",
                    phone: "",
                    password: "",
                    confirmPass: "",
                    name: "",
                  });
                }}
                className="text-[blue] hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-violet-900 cursor-pointer">
                Forget Password?
              </small>
              <small>
                {" "}
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setIsRegister(true);
                    setForm({
                      email: "",
                      phone: "",
                      password: "",
                      confirmPass: "",
                      name: "",
                    });
                  }}
                  className="text-[blue] hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

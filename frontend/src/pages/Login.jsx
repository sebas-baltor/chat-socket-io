import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../style";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  return (
    <div className={`${styles.flexCenter} ${styles.paddings} min-h-screen`}>
      <div className="flex flex-col gap-12 p-4 max-w-[500px] w-full bg-slate-50 rounded-lg">
        <h1 className="font-black text-4xl text-center">Login</h1>
        {serverError ? (
          <div className="text-red-300 text-center">{serverError}</div>
        ) : (
          " "
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("ingresa un email valido")
              .required("campo requerido"),
            password: Yup.string().required("campo requerido"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            let res = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            let data = await res.json();
            if (res.status !== 200) {
              return setServerError(data.message);
            }
            dispatch(setLogin(data.data));
            navigate("/");
          }}
        >
          <Form className="flex flex-col gap-4">
            <label>
              <span className="font-bold text-slate-700">Email</span>
              <Field
                name="email"
                type="email"
                className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />
              <span className="text-red-400 text-xs">
                <ErrorMessage name="email" />
              </span>
            </label>
            <label>
              <span className="font-bold text-slate-700">Contrase??a</span>
              <Field
                name="password"
                type="password"
                className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />

              <span className="text-red-400 text-xs">
                <ErrorMessage name="password" />
              </span>
            </label>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-violet-400 text-white w-1/2 lg:w-1/3 mx-auto"
            >
              Enviar
            </button>
          </Form>
        </Formik>
        <div className="opacity-70 text-center">
          Si a??n no tienes cuenta{" "}
          <a href="/crear-cuenta" className="text-violet-400">
            Crea una.
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;

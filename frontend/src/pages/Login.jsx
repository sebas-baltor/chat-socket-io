import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../style";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../redux";
function Login() {
  return (
    <div className={`${styles.flexCenter} ${styles.paddings} min-h-screen`}>
      <div className="flex flex-col gap-12 p-4 max-w-[500px] w-full bg-slate-50 rounded-lg">
        <h1 className="font-black text-4xl text-center">Login</h1>
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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
              <span className="font-bold text-slate-700">Contraseña</span>
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
            Si aún no tienes cuenta{" "}
            <a href="/crear-cuenta" className="text-violet-400">
              Crea una.
            </a>
          </div>
      </div>
    </div>
  );
}
export default Login;

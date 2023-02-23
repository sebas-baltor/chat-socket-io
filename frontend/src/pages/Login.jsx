import { useFormik } from "formik";
// import { Formik, Form, Field, ErrorMessage } from "formik";
function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // return (
  //   <div className="w-screen h-screen flex justify-center items-center">
  //     <Formik
  //       initialValues={{
  //         email: "",
  //         password: "",
  //       }}
        
  //       onSubmit={(values, { setSubmitting }) => {
  //         alert(JSON.stringify(values, null, 2));
  //         setSubmitting(false);
  //       }}
  //       className="flex flex-col gap-12 p-4 w-[400px] max-w-[500px] bg-slate-50 rounded-lg"
  //     >
  //       <h2 className="text-center text-4xl font-black">Iniciar Sesion</h2>
  //       {({ isSubmitting }) => (
  //         <>
  //           <Form className=" flex flex-col gap-3">
  //             <label htmlFor="i__email">
  //               <span className="font-bold text-slate-700">Gmail</span>
  //               <Field
  //                 id="i__email"
  //                 type="email"
  //                 name="email"
  //                 // onChange={formik.handleChange}
  //                 // value={formik.values.email}
  //                 className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
  //                 placeholder="tucorreo@gmail.com"
  //               />
  //             </label>
  //             <label htmlFor="i__password">
  //               <span className="font-bold text-slate-700">Password</span>
  //               <Field
  //                 id="i__password"
  //                 type="password"
  //                 name="password"
  //                 onChange={formik.handleChange}
  //                 // value={formik.values.password}
  //                 className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
  //               />
  //             </label>
  //             <button
  //               type="submit"
  //               className="px-3 py-2 rounded bg-violet-400 text-white w-1/2 lg:w-1/3 mx-auto"
  //               disabled={isSubmitting}
  //             >
  //               Enviar
  //             </button>
  //           </Form>
  //           <div className="opacity-70">
  //             Si aún no tienes cuenta{" "}
  //             <a href="/create-account" className="text-violet-400">
  //               Crea una.
  //             </a>
  //           </div>
  //         </>
  //       )}
  //     </Formik>
  //   </div>
  // );
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-12 p-4 w-[400px] max-w-[500px] bg-slate-50 rounded-lg">
        <h2 className="text-center text-4xl font-black">Iniciar Sesion</h2>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-3">
          <label htmlFor="i__email">
            <span className="font-bold text-slate-700">Gmail</span>
            <input
              id="i__email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              placeholder="tucorreo@gmail.com"
            />
          </label>
          <label htmlFor="i__password">
            <span className="font-bold text-slate-700">Password</span>
            <input
              id="i__password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
            />
          </label>
          <button
            type="submit"
            className="px-3 py-2 rounded bg-violet-400 text-white w-1/2 lg:w-1/3 mx-auto"
          >
            Enviar
          </button>
        </form>
        <div className="opacity-70">
          Si aún no tienes cuenta{" "}
          <a href="/create-account" className="text-violet-400">
            Crea una.
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;

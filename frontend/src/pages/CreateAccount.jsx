import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import styles from "../style";
function CreateAccount() {
  const phoneNumberRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [profileImg, setProfileImg] = useState("");
  return (
    <div className={`${styles.paddings} min-h-screen ${styles.flexCenter}`}>
      <div className="flex flex-col gap-12 p-4 w-full max-w-[700px] bg-slate-50 rounded-lg">
        <h1 className="text-4xl font-black text-center">Crear cuenta</h1>
        <Formik
          initialValues={{
            name: "",
            lastname: "",
            phone: "",
            password: "",
            email: "",
            profilePhoto: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(60, "Tu nombre deberia tener menor de 60 letras")
              .required("campo requerido"),
            lastname: Yup.string()
              .max(60, "Tu nombre deberia tener menor de 60 letras")
              .required("campo requerido"),
            phone: Yup.string()
              .matches(phoneNumberRegExp, "numero de telefono invalido")
              .required("campo requerido"),
            password: Yup.string().length(10).required("campo requerido"),
            email: Yup.string()
              .email("correo invalido")
              .required("campo requerido"),
            profilePhoto: Yup.mixed().required("ingresa tu foto de perfil"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log({ values, profileImg });
          }}
          
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              <span className="font-bold text-slate-700">Nombre</span>
              <Field
                name="name"
                type="text"
                className="w-full p-2 outline-none rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />
              <span className="text-red-400 text-xs">
                <ErrorMessage name="name" />
              </span>
            </label>
            <label>
              <span className="font-bold text-slate-700">Apellido</span>
              <Field
                name="lastname"
                type="text"
                className="w-full p-2 outline-none rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />
              <span className="text-red-400 text-xs">
                <ErrorMessage name="lastname" />
              </span>
            </label>
            <label>
              <span className="font-bold text-slate-700">Telefono</span>
              <Field
                name="phone"
                type="text"
                className="w-full p-2 outline-none rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />
              <span className="text-red-400 text-xs">
                <ErrorMessage name="phone" />
              </span>
            </label>
            <label>
              <span className="font-bold text-slate-700">Email</span>
              <Field
                name="email"
                type="email"
                className="w-full p-2 outline-none rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
                
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
                className="w-full p-2 outline-none  rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
              />
              <span className="text-red-400 text-xs">
                <ErrorMessage name="password" />
              </span>
            </label>
            <div className="sm:col-span-2">
              <span className="font-bold text-slate-700">Foto de perfil</span>
              <Dropzone
                onDrop={(acceptedFiles) => setProfileImg(acceptedFiles[0])}
                accept={{ "image/*": [".jpeg", ".png"] }}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section
                    className={`${
                      profileImg
                        ? "bg-violet-300 hover:bg-violet-300 border-solid"
                        : ""
                    } w-full h-18 border-dotted border-2 border-violet-200 p-4 hover:bg-violet-50`}
                  >
                    <div {...getRootProps()}>
                      {/* <Field
                        type="file"
                        {...getInputProps()}
                        name="profilePhoto"
                      /> */}
                      <input
                        type="file"
                        {...getInputProps()}
                        name="profilePhoto"
                        onChange={()=>{
                          console.log("cambie")
                        }}
                      />
                      <p className="text-center opacity-50">
                        {profileImg.name
                          ? profileImg.name
                          : "arrastrala aqui!! o has click"}
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <ErrorMessage name="profilePhoto"/>
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-violet-400 text-white w-1/2 lg:w-1/3 mx-auto sm:col-span-2"
            >
              Crear
            </button>
          </Form>
        </Formik>
        <div className="opacity-70 text-center">
          Si ya tienes cuenta{" "}
          <a href="/login" className="text-violet-400">
            logueate
          </a>
        </div>
        <div><input type="file" name="no se" id="sea" /></div>
      </div>
    </div>
  );
}
export default CreateAccount;

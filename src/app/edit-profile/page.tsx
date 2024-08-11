"use client";

import FormButton from "@/components/FormButton";
import InputForm from "@/components/InputForm";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Industri",
    "Kreatif",
    "Pertanian",
    "Teknologi",
    "Pendidikan",
    "Transportasi",
    "Properti",
    "Kuliner",
  ];

  const initialValues = {
    birthYear: "",
  };

  const validationSchema = Yup.object({
    birthYear: Yup.string().required(),
  });

  function handleRegister() {}

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <div className="max-w-[600px] flex flex-col justify-center items-center">
        <h1 className="text-[33px] font-[700] text-blue-400">
          Perkenalkan Diri Kamu
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6 mt-[50px]"
              >
                <Field
                  component={InputForm}
                  id="birthYear"
                  name="birthYear"
                  label="Tahun Lahir"
                  type="text"
                  placeholder="Tahun Lahir"
                  value={values.birthYear}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="birthYear"
                  component="div"
                  className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                />

                <Field
                  component={InputForm}
                  id="birthYear"
                  name="birthYear"
                  label="Pendidikan"
                  type="text"
                  placeholder="Pendidikan"
                  value={values.birthYear}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="birthYear"
                  component="div"
                  className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                />

                <Field
                  component={InputForm}
                  id="birthYear"
                  name="birthYear"
                  label="Nomor Handphone"
                  type="text"
                  placeholder="Nomor Handphone"
                  value={values.birthYear}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="birthYear"
                  component="div"
                  className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                />

                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="border border-gray-400 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <p className="font-bold">Bisnis Tag</p>

                <FormButton
                  text={isLoading ? "Loading..." : "Berikutnya"}
                  type="submit"
                  disabled={isLoading}
                />
              </form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
};

export default EditProfile;
"use client";

import TextArea from "@/components/TextArea";
import InputForm from "@/components/InputForm";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

const EditBisnis1 = ({ next, data }: any) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .typeError("Nama Bisnis harus berupa teks.")
      .required("Nama Bisnis anda wajib diisi."),
    omset: Yup.number()
      .typeError("Omset harus berupa angka.")
      .required("Omset anda wajib diisi."),
    description: Yup.string()
      .typeError("Deskripsi Bisnis harus berupa teks.")
      .required("Deskripsi Bisnis anda wajib diisi."),
  });

  const handleSubmit = (values: any) => {
    next(values);
  };
  if (!data) {
    console.log("ini datanya bro", data);
    return <div>Data tidak ditemukan!</div>;
  }

  return (
    <main className="flex items-center justify-center w-[100vw]">
      <div
        key={data.id}
        className="w-full min-w-[420px] max-w-[700px] flex flex-col justify-center items-center md:px-4"
      >
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleSubmit }) => {
            console.log("ini data ketika klik edit bisnis", data);
            return (
              <form
                onSubmit={handleSubmit}
                className="m-0 w-full flex flex-col items-center justify-center p-10 box-border gap-10 mq750:gap-[25px] shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-[10px]"
              >
                <div className="w-full">
                  <Field
                    component={InputForm}
                    id="name"
                    name="name"
                    label="Nama Bisnis"
                    type="text"
                    placeholder="Nama Bisnis Anda"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                  />
                </div>

                <div className="w-full">
                  <Field
                    component={InputForm}
                    id="omset"
                    name="omset"
                    label="Omset"
                    type="number"
                    placeholder="Omset Bisnis Anda"
                    value={values.omset}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="omset"
                    component="div"
                    className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                  />
                </div>

                <div className="w-full">
                  <Field
                    component={TextArea}
                    id="description"
                    name="description"
                    label="Deskripsi Bisnis"
                    placeholder="Deskripsi Bisnis Anda"
                    onChange={handleChange}
                    value={values.description}
                    className="h-[calc(100vh/3)]"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[34px] flex justify-center items-center rounded-[10px] bg-[#FD5F00] hover:bg-[#FD5F00]/80 text-[18px] text-[#FFFFFF]"
                >
                  Berikutnya
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
};

export default EditBisnis1;

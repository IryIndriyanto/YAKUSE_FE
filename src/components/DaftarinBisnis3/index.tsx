'use client';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

// Pada file ini, kita akan membuat form untuk mengisi foto bisnis
// body yang di perlukan untuk endpoint ini adalah
// {
//   photo_url: string

const DaftarinBisnis3 = ({ submit, prev, data }: any) => {
  const [fotoUploaded, setFotoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues = {
    photo_url: data.photo_url || '',
  };

  const validationSchema = Yup.object({
    photo_url: Yup.mixed().required('Foto bisnis wajib diunggah.'),
  });

  const handleSubmit = (values: any) => {
    submit(values);
  };

  return (
    <main className="flex items-center justify-center">
      <div className="max-w-[600px] flex flex-col justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="m-0 w-[715px] flex flex-col items-center justify-center py-0 px-5 box-border gap-[50px] max-w-full mq750:gap-[25px]"
            >
              <div className="w-full">
                <label
                  htmlFor="photo_url"
                  className="block text-[18px] font-[500] mb-2"
                >
                  Unggah Foto Bisnis
                </label>
                <input
                  id="photo_url"
                  name="photo_url"
                  type="file"
                  // accept="image/*"
                  onChange={(event) => {
                    if (
                      event.currentTarget.files &&
                      event.currentTarget.files.length > 0
                    ) {
                      const file = event.currentTarget.files[0];
                      setFieldValue('photo_url', file);
                      setFotoUploaded(true);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border-2 border-gray-300"
                />
                <ErrorMessage
                  name="photo_url"
                  component="div"
                  className="text-red-500 text-[14px] font-[500] h-[20px] w-full"
                />
                {fotoUploaded && (
                  <p className="text-center text-green-500 mt-2">
                    Foto berhasil diunggah
                  </p>
                )}
                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                {/* Button untuk halaman sebelumnya */}
                <button
                  type="button"
                  className="w-full h-[40px] flex justify-center items-center rounded-[10px] bg-[#525455] hover:bg-[#525455]/80 text-[18px] text-[#FFFFFF]"
                  onClick={prev}
                >
                  sebelumnya
                </button>
                {/*  button untuk submit */}
                <button
                  type="submit"
                  className="w-full h-[40px] flex justify-center items-center rounded-[10px] bg-[#FD5F00] hover:bg-[#FD5F00]/80 text-[18px] text-[#FFFFFF]"
                >
                  Buat Bisnis
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default DaftarinBisnis3;

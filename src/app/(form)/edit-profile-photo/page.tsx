"use client";

import FormButton from "@/components/FormButton";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constant";
import Link from "next/link";

const EditProfilePhoto = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const router = useRouter();

const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    const allowedFileTypes = ['image/png', 'image/jpeg']; 

    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Please select a valid image file (PNG or JPG).");
      return;
    }

    const maxFileSize = 1024 * 1024; 

    if (file.size > maxFileSize) {
      toast.error("File size exceeds the maximum allowed size (1MB).");
      return;
    }

    setSelectedImage(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }
};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    setIsDisable(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.put(`${BASE_URL}/user/edit/photo-profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Profile Updated");
        router.push("/profile-user");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`${error.response.data.detail}`);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-[33px] font-[700] text-blue-400 text-center">
          Edit Profile Photo
        </h2>
        <div className="w-full my-2 flex justify-between  mb-12">
          <Link className="hover:text-p-four hover:underline " href="/edit-profile">Gambaran Umum</Link>
          <p className="text-p-four underline">Foto Kamu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-12">
            <label htmlFor="fileUpload" className="cursor-pointer">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-36 h-36 object-cover rounded-full border border-gray-300 shadow-sm"
                />
              ) : (
                <div className="w-36 h-36 bg-gray-200 flex items-center justify-center rounded-full border border-gray-300 shadow-sm">
                  <span className="text-gray-500 text-center font-semibold">
                    Click to Upload Photo
                  </span>
                </div>
              )}
            </label>
            <p className="mt-4 text-xs text-gray-500">Select a PNG or JPG file (max 1MB)</p>
            <input
              type="file"
              id="fileUpload"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <FormButton
            text="Upload Photo"
            type="submit"
            disabled={isDisable}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfilePhoto;

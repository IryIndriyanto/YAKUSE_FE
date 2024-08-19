"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditBisnis1 from "../EditBisnis1";
import EditBisnis2 from "../EditBisnis2";
import EditBisnis3 from "../EditBisnis3";
import { BASE_URL } from "@/utils/constant";
import useFetchBusinessById from "../../hooks/useFetchBusinessById";

const EditBisnisForm: React.FC<{ businessId: string }> = ({ businessId }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    omset: 0,
    description: "",
    location: "",
    contact: "",
    fk_business_category_id: "",
    photo_url: "",
  });

  const router = useRouter();
  const { business, loading, error } = useFetchBusinessById(businessId);

  useEffect(() => {
    if (business) {
      console.log("Business data:", business);
      setFormData({
        name: business.name,
        omset: business.omset,
        description: business.description_list.join(", "),
        location: business.location,
        contact: business.contact,
        fk_business_category_id: business.category,
        photo_url: business.photo_url,
      });
    }
  }, [business]);

  const handleNext = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    const fileInput = document.getElementById("photo_url")! as HTMLInputElement;
    console.log(formData.photo_url);

    const form = new FormData();
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);
      console.log(formData.photo_url);
      form.append("file", fileInput.files[0], fileInput.files[0].name);
    }

    try {
      const token = localStorage.getItem("access_token");
      console.log(formData.fk_business_category_id);
      const queryCreateBusiness =
        `?name=${encodeURIComponent(formData.name)}` +
        `&omset=${formData.omset}` +
        `&description=${encodeURIComponent(formData.description)}` +
        `&location=${encodeURIComponent(formData.location)}` +
        `&contact=${encodeURIComponent(formData.contact)}` +
        `&fk_business_category_id=${encodeURIComponent(
          formData.fk_business_category_id
        )}`;

      const response = await fetch(
        `${BASE_URL}/business/create${queryCreateBusiness}`,
        {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Business successfully Updated!");
        router.push("/profile-user");
      } else {
        const resData = await response.json();
        console.log(response);
        console.log(response.statusText);
        console.log(resData);
        alert("Failed to update business");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
    console.log("button clicked");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-[33px] font-[700] text-blue-400 flex justify-center mb-8">
        Perbarui Bisnis
      </h1>
      <div className="flex justify-center mb-8">
        <div
          className={`mx-4 ${step === 1 ? "text-[#FD5F00]" : "text-gray-500"}`}
        >
          Gambaran Umum
        </div>
        <div
          className={`mx-4 ${step === 2 ? "text-[#FD5F00]" : "text-gray-500"}`}
        >
          Detail Bisnis
        </div>
        <div
          className={`mx-4 ${step === 3 ? "text-[#FD5F00]" : "text-gray-500"}`}
        >
          Photo Bisnis
        </div>
      </div>
      {step === 1 && <EditBisnis1 next={handleNext} data={formData} />}
      {step === 2 && (
        <EditBisnis2
          next={handleNext}
          prev={handlePrev}
          submit={handleSubmit}
          data={formData}
        />
      )}
      {step === 3 && (
        <EditBisnis3
          submit={handleSubmit}
          prev={handlePrev}
          data={formData}
        />
      )}
    </div>
  );
};

export default EditBisnisForm;
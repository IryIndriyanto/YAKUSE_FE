"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MyBusinessId } from "./types";
import CircularIndeterminate from "../BisniskuCardListUser/CircularIndeterminate";

const BisniskuCardListOtherUser = ({
  businessesId,
}: {
  businessesId: MyBusinessId[];
}) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/detail-bisnis-other-user/${id}`);
  };

  if (!businessesId) {
    return (
      <div className="flex flex-col justify-center items-center mt-[-50px]">
        <CircularIndeterminate />
      </div>
    );
  }

  if (businessesId.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-[20px] font-bold">Pemilik belum memiliki bisnis.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:max-w-[750px] lg:mx-auto">
      {businessesId.map((businessId: MyBusinessId) => (
        <div
          key={businessId.id}
          className="flex items-center justify-between font-serif bg-[#E5F5FF] rounded-[8px] p-4 transform hover:scale-105 transition-all duration-300 lg:max-w-[750px] lg:mx-auto"
          onClick={() => handleCardClick(businessId.id)}
        >
          <div className="flex items-center gap-8">
            <div>
              <Image
                className="rounded-full w-[150px] h-[150px] bg-image bg-cover bg-center object-cover max-w-none"
                src={businessId.photo_url || "/default-gray-photo.webp"}
                alt={businessId.name}
                width={150}
                height={150}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[28px] font-bold lg:text-[26px]">
                {businessId.name}
              </h4>
              <p className="text-[18px] text-[#005792]">
                #{businessId.category}
              </p>
              <p className="text-[18px] text-[#525455] md:hidden">
                {businessId.location}
              </p>
            </div>
          </div>

          <div>
            <Image
              className="cursor-pointer"
              src="/chevron-right.svg"
              alt="chevron right"
              width={50}
              height={50}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BisniskuCardListOtherUser;

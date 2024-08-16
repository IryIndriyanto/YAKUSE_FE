import Image from "next/image";
import { OtherUserProfile } from "./types";

interface ProfileCardOtherUserProps {
  profileId: OtherUserProfile | null;
}

const ProfileCardOtherUser = ({ profileId }: ProfileCardOtherUserProps) => {
  if (!profileId) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="flex flex-col justify-between bg-[#E5F5FF] rounded-[10px] p-10 w-[1200px] font-serif min-h-[700px]">
      <div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <div>
              <Image
                src={profileId?.photo_url || "/default-gray-photo.webp"}
                alt="foto-user"
                width={250}
                height={250}
              />
            </div>
            <div>
              <p className="text-[14px] text-[#40ABFF] cursor-pointer">
                #Kuliner #Fashion #Tech
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-[41px] font-bold">{profileId?.fullname}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-bold text-[#40ABFF]">
                  Contact
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${profileId?.email}`}
                    className="text-[#40ABFF] cursor-pointer"
                  >
                    {profileId?.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={`https://wa.me/${profileId?.phone}`}
                    className="text-[#40ABFF] cursor-pointer"
                  >
                    {profileId?.phone}
                  </a>
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <Image src="/star.svg" alt="star" width={50} height={50} />
                <div className="flex items-end">
                  <p className="text-[41px] font-bold">
                    5.0<span className="text-[#FD5F00]">/</span>
                  </p>
                  <p className="text-[#FD5F00] text-[24px] font-bold">5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-serif my-5 min-h-64">
        <h3 className="text-xl font-semibold">Tentang Saya</h3>
        <p className="text-lg text-justify py-4">{profileId?.about_me_list}</p>
      </div>
    </div>
  );
};

export default ProfileCardOtherUser;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFetchProfile from "../../../hooks/useFetchProfile";
import BisniskuCardListUser from "../../../components/BisniskuCardListUser";
import PermintaankuCardListUser from "../../../components/PermintaankuCardListUser";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProfileCardUser from "../../../components/ProfileCardUser";
import Image from "next/image";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Bisnisku");
  const { profile, fetchError, loading } = useFetchProfile();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (activeSection === "Bisnisku") {
      router.push("/daftarin-bisnis");
    } else {
      router.push("/need-form");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[700px]">
        <Image
          src="/loading-gear.gif"
          alt="Loading..."
          width={300}
          height={300}
        />
      </div>
    );
  }

  if (fetchError || error) {
    return <div className="bg-[#FCFCFC] w-full">
      <div className="flex justify-center items-center mt-10 h-[65vh]">
        <p className="text-[24px] font-bold">Error: {fetchError || error}</p>
      </div>
    </div>;
  }

  return (
    <div className="bg-[#FCFCFC] w-full">
      {/* <div>
        <Navbar />
      </div> */}

      <div className="flex justify-center items-center mt-10">
        <ProfileCardUser
          buttonLabel={activeSection === "Bisnisku" ? "Daftarin Bisnis" : "Daftarin Permintaan"}
          onClick={handleClick}
          setError={setError}
          profile={profile}
        />
      </div>

      <div className="my-20 w-[1200px] mx-auto">
        <div className="flex justify-between w-[800px] mx-auto pb-4">
          <p
            className={`text-[24px] font-bold cursor-pointer transition-all duration-300 relative ${
              activeSection === "Bisnisku" ? "text-[#FD5F00]" : "text-black"
            }`}
            onClick={() => setActiveSection("Bisnisku")}
          >
            Bisnisku
            {activeSection === "Bisnisku" && (
              <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#FD5F00] transition-all duration-300"></span>
            )}
          </p>
          <p
            className={`text-[24px] font-bold cursor-pointer transition-all duration-300 relative ${
              activeSection === "Permintaanku" ? "text-[#FD5F00]" : "text-black"
            }`}
            onClick={() => setActiveSection("Permintaanku")}
          >
            Permintaanku
            {activeSection === "Permintaanku" && (
              <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#FD5F00] transition-all duration-300"></span>
            )}
          </p>
        </div>
      </div>

      {activeSection === "Bisnisku" && (
        <div className="flex flex-col gap-4 mt-10 w-[1200px] mx-auto">
          <BisniskuCardListUser
            image="/image-bisnis-card-list.svg"
            title="Popcorn"
            category="#Kuliner"
            address="Jl. Raya Bogor No. 123, Kel. Ciracas, Kec. Ciracas, Jakarta Timur, DKI Jakarta 13740"
          />
          <BisniskuCardListUser
            image="/image-bisnis-card-list.svg"
            title="Caramel"
            category="#Kuliner"
            address="Jl. Raya Bogor Km. 30, Mekarsari, Kec. Cimanggis, Kota Depok, Jawa Barat 16452"
          />
          <BisniskuCardListUser
            image="/image-bisnis-card-list.svg"
            title="Makanan Burung"
            category="#PakanHewan"
            address="Jl. Raya Serpong No. 89, Kel. Serpong, Kec. Serpong, Kota Tangerang Selatan, Banten 15310"
          />
        </div>
      )}

      {activeSection === "Permintaanku" && (
        <div className="flex flex-col gap-4 mt-10 w-[1200px] mx-auto">
          <PermintaankuCardListUser
            image="/image-bisnis-card-list.svg"
            title="PO Jagung Pipil"
            description="Butuh jagung pipil sebanyak 100 Kg selambatnya akhir Agustus 2024"
            postedAt="09 Agustus 2024"
          />
          <PermintaankuCardListUser
            image="/image-bisnis-card-list.svg"
            title="PO Gula Pasir"
            description="Butuh gula pasir sebanyak 200 Kg selambatnya akhir Agustus 2024"
            postedAt="08 Agustus 2024"
          />
          <PermintaankuCardListUser
            image="/image-bisnis-card-list.svg"
            title="PO Jagung Kering"
            description="Butuh jagung kering untuk pakan burung sebanyak 300 Kg selambatnya akhir Agustus 2024"
            postedAt="07 Agustus 2024"
          />
        </div>
      )}

      {/* <div className="mt-10">
        <Footer />
      </div> */}
    </div>
  );
};

export default Profile;
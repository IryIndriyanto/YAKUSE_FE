  "use client";
  import Searchbar from "@/components/Searchbar";
  import Filter from "@/components/Filter";
  import Recommendation from "@/components/Recommendation";
  import BusinessCard from "@/components/BusinessCard";
  import { useState, useEffect } from "react";
  import ButtonList from "@/components/ButtonList";
  import { useRouter } from "next/navigation";
  import { bisnisType } from "@/data/type";
  import { Toaster } from "react-hot-toast";
  import { fetchAllBusiness, fetchBusinessById } from "@/data/api";

  export default function PageKebutuhan() {
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<bisnisType[]>([]);
    const [filteredData, setFilteredData] = useState<bisnisType[]>([]);
    const [activeBusinessId, setActiveBusinessId] = useState<string | null>(null);
    const [activeBusinessData, setActiveBusinessData] =
      useState<bisnisType | null>(null);
    const [shown, setShown] = useState<boolean>(false);
    const [activeFilters, setFilters] = useState<string[]>([]);
    const router = useRouter();

    async function fetchData() {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const data = await fetchAllBusiness(token);
          setData(data);
          setFilteredData(data);
        }
        // setData(bisnis);
        // setFilteredData(bisnis);
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    function handleFilter(data: bisnisType[]) {
      if (activeFilters.length === 0) return data;

      return data.filter((item: bisnisType) =>
        activeFilters.some((filter) =>
          item.category
            ? item.category.toLowerCase().includes(filter.toLowerCase())
            : false
        )
      );
    }

    function handleSearch(value = "") {
      setShown(Boolean(value));

      const filterData = handleFilter(data);

      const searchedData = filterData.filter((item: bisnisType) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(searchedData);
    }

    useEffect(() => {
      const filteredByFilters = handleFilter(data);
      setFilteredData(filteredByFilters);
    }, [activeFilters, data]);

    useEffect(() => {
      handleSearch(search);
    }, [search]);

    const handleBusinessClick = (id: string) => {
      setActiveBusinessId(id);
    };

    async function fetchActiveBusiness() {
      if (activeBusinessId) {
        try {
          const token = localStorage.getItem("access_token");
          if (token) {
            const data = await fetchBusinessById(activeBusinessId, token);
            setActiveBusinessData(data);
            // }
            // const businessData = bisnis.find(
            //   (bisnis) => bisnis.id === activeBusinessId
            // );
            // if (businessData) {
            //   setActiveBusinessData(businessData);
          } else {
            console.log(`No mock data found for ID ${activeBusinessId}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    useEffect(() => {
      fetchActiveBusiness();
    }, [activeBusinessId]);

    return (
      <>
        <main className="w-full sm:w-full flex justify-between place-items-start gap-10 p-10">
          <Toaster />
          <div className="w-1/3 flex flex-col flex-wrap gap-5 ">
            <Searchbar
              search={search}
              shown={shown}
              setSearch={setSearch}
              fetchData={handleSearch}
            />
            <Filter setFilter={setFilters} />
            <Recommendation
              data={filteredData}
              filter={activeFilters}
              onClick={handleBusinessClick}
            />
            <div className="flex flex-col gap-5 justify-start">
            <p className="text-xl text-center text-b-two font-semibold capitalize">Belum menemukan keiinginanmu</p>
             <ButtonList
              onClick={() => router.push("/need-form")}
              label={"Daftarin Permintaan"}
              iconSrc="/icon-plus.svg"
              variant="Daftar"
            />
            </div>
          </div>
          <BusinessCard business={activeBusinessData} />
        </main>
      </>
    );
  }

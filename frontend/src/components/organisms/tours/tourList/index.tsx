"use client";

import { TourListApi } from "@/apiEndpoints/tours";
import { TourMember } from "@/interfaces/tour";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tourImagePlaceholder from "../../../../../public/images/beach.jpg";
import ListCard from "@/components/molecules/listCard";
import { formatDate } from "@/utils/helper";
import { Tabs } from "@/interfaces/common";
import Tab from "@/components/molecules/tab";
import LoaderSkeleton from "@/components/atoms/loaderSkeleton";
import { List, CalendarClock, Bike, Plus } from "lucide-react";
import notFound from "../../../../../public/images/web-error.png";
import ImageAtom from "@/components/atoms/image";
import SearchAtom from "@/components/atoms/search";
import Pagination from "@/components/molecules/Pagination";
import FloatingButton from "@/components/atoms/floating-button";

const TourList = () => {
  const router = useRouter();

  const [tours, setTours] = useState<TourMember | null>(null);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs: Tabs[] = [
    { id: 1, text: "All", value: "", icon: <List className="h-4 w-4" /> },
    {
      id: 2,
      text: "OnGoing",
      value: "ONGOING",
      icon: <Bike className="h-4 w-4" />,
    },
    {
      id: 3,
      text: "Upcoming",
      value: "UPCOMING",
      icon: <CalendarClock className="h-4 w-4" />,
    },
  ];
  const [params, setParams] = useState<Record<string, string>>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handleClick = (id: string) => {
    router.push(`/tours/${id}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (currentTab === 1) {
      setParams((prev) => {
        const newParams = { ...prev };
        delete newParams.status;
        return newParams;
      });
    } else {
      setParams({ status: tabs[currentTab - 1].value });
    }
  }, [currentTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setParams((prev) => {
      const newParams = { ...prev };
      if (debouncedSearch) {
        newParams.search = debouncedSearch;
      } else {
        delete newParams.search;
      }
      return newParams;
    });
  }, [debouncedSearch]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: page.toString(),
      limit: limit.toString(),
    }));
  }, [page]);

  useEffect(() => {
    const getTourList = async () => {
      setIsLoading(true);
      setIsSearching(true);
      try {
        const response = await TourListApi({
          param: new URLSearchParams(params),
        });
        setTours(response);
        setTotalItems(response.total || 1);
        setLimit(response.limit || 10);
        setPage(response.page || 1);
        setIsLoading(false);
        setIsSearching(false);
      } catch (error) {
        setIsLoading(false);
        setIsSearching(false);
        console.log(error);
      }
    };

    getTourList();
  }, [params]);

  return (
    <div className="relative">
      <SearchAtom
        value={searchQuery}
        onChange={handleSearch}
        className="mx-[21px]"
      />
      <Tab
        items={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasIcon
      />
      {isLoading ? (
        <LoaderSkeleton quantity={10} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          {isSearching || (tours && tours?.data?.length > 0) ? (
            tours?.data?.map((tour, index) => (
              <div
                key={index}
                onClick={() => {
                  handleClick(tour.tour._id);
                }}
                className={`cursor-pointer w-[calc(100%-40px)] h-full m-2 ${index === tours?.data?.length - 1 ? "mb-28" : "mb-3"
                  }`}
              >
                <ListCard
                  image={tourImagePlaceholder}
                  title={tour.tour.title}
                  description={tour.tour.description}
                  startDate={formatDate(tour.tour.startDate?.toString())}
                  endDate={formatDate(tour.tour.endDate?.toString())}
                  place={tour.tour.place}
                  type={tour.tour.type}
                  isLeader={tour.role === "LEADER"}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-40">
              <ImageAtom
                src={notFound}
                alt="Not Found"
                height={100}
                width={100}
              />
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {debouncedSearch ? "No matching results!" : "No Tours Found!"}
              </p>
            </div>
          )}
        </div>
      )}
      {isSearching ||
        (tours && tours?.data?.length > 0 && tours?.total > tours?.limit) ? (
        <div className="mb-2">
          <Pagination
            page={page}
            totalItems={totalItems}
            itemsPerPage={limit}
            setPage={setPage}
            maxButtonsToShow={5}
          />
        </div>
      ) : null}

      <FloatingButton
        onClick={() => router.push("/tours/create")}
        Icon={<Plus className="h-6 w-6" />}
        className="w-12 h-12 bg-blue-500 text-white hover:bg-blue-600"
      />
    </div>
  );
};

export default TourList;

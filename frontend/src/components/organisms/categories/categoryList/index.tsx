"use client";

import SearchAtom from "@/components/atoms/search";
import CategoryCard from "@/components/molecules/categoryCard";
import { TCategory } from "@/interfaces/categories";
import React, { useEffect, useState } from "react";
import { getCategoriesApi } from "@/apiEndpoints/categories";
import Icon from "@/components/atoms/Icon";
import ImageAtom from "@/components/atoms/image";
import notFound from "../../../../../public/images/web-error.png";
import FloatingButton from "@/components/atoms/floating-button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeCategory } from "@/redux/slices/category";
import {  deleteCategoryApi } from "@/apiEndpoints/categories";

type Props = {};

const CategoryList = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<
    TCategory[] | null
  >(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredCategories = categories?.filter((category) =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filteredCategories ?? null);
    } else {
      setFilteredCategories(null);
    }
  }, [searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getCategoriesApi();
        setCategories(response);
      } catch (error) {
        console.log("error during fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();

    dispatch(removeCategory());
  }, []);

  const handleDelete = (id: string) => async () => {
    try {
      const response = await deleteCategoryApi(id);
      if (response) {
        const newCategories = categories?.filter((category) => category._id !== id);
        setCategories(newCategories ?? null);
      }
    } catch (error) {
      console.log("error during deleting category:", error);
    }
  }

  return (
    <div>
      <SearchAtom
        value={searchQuery}
        onChange={handleSearch}
        className="mx-[21px] mb-[21px]"
      />

      {(filteredCategories ?? categories ?? []).length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pl-[21px] gap-4 justify-items-center max-h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden pr-[21px] pb-[110px]">
          {(filteredCategories ?? categories ?? []).map((category) => (
            <CategoryCard
              key={category._id}
              name={category.title}
              color={category.color}
              icon={<Icon name={category.icon}/>}
              onEdit={() => router.push(`/categories/edit/${category._id}`)}
              onDelete={handleDelete(category._id)}
              onClick={
                ()=>
                  console.log("Category Clicked" , category.title)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-40">
          <ImageAtom src={notFound} alt="Not Found" height={100} width={100} />
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {searchQuery ? "No matching results!" : "No Categories Found!"}
          </p>
        </div>
      )}
      <FloatingButton
        onClick={() => router.push("/categories/create")}
        Icon={<Plus className="h-6 w-6" />}
        className="w-12 h-12 bg-blue-500 text-white hover:bg-blue-600"
      />
    </div>
  );
};

export default CategoryList;

"use client";
import React, { useCallback } from "react";

import {
  createCategoryApi,
  updateCategoryApi,
} from "@/apiEndpoints/categories";
import Button from "@/components/atoms/button";
import FormInput from "@/components/atoms/formInput";
import { FormDataCategory } from "@/interfaces/categories";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CategoryByIdApi } from "@/apiEndpoints/categories";
import { TCategory } from "@/interfaces/categories";
import { useParams } from "next/navigation";
import IconGrid from "@/components/molecules/IconGrid";
import { icons, ShoppingCart } from "lucide-react";
import ColorPicker from "@/components/atoms/color-picker";
import { useDispatch, useSelector } from "react-redux";
import { saveCategory, removeCategory } from "@/redux/slices/category";
import { RootState } from "@/redux/rootReducer";
import { toKebabCase, toPascalCase } from "@/utils/helper";

const CreateCategory = () => {
  const RCategory = useSelector((state: RootState) => state.category);
  const [selectedIcon, setSelectedIcon] = useState<string>(RCategory.icon);
  const [selectedColor, setSelectedColor] = useState<string>(RCategory.color);
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = useParams();
  const defaultIcons = [
    "ShoppingCart",
    "Utensils",
    "Home",
    "BusFront",
    "Bed",
    "Film",
    "Music",
    "BookOpen",
    "Briefcase",
    "Lightbulb",
    "Plane",
    "PiggyBank",
    "Hotel",
    "Heart",
    "Car",
    "Beef",
    "Drink",
    "Coffee",
    "Pizza",
    "Ham",
    "Sandwich",
    "Soup",
    "UtensilsCrossed",
    "Beer",
    "Fish",
    "Milk",
    "Martini",
    "Ticket",
    "Train",
    "Bicycle",
    "Ship",
  ];

  const filteredIcons = Object.entries(icons).filter(
    ([name]) => defaultIcons.includes(name) || name === selectedIcon
  );

  const [category, setCategory] = useState<TCategory | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: RCategory.title,
      icon: toPascalCase(RCategory.icon),
      color: RCategory.color,
    },
  });

  useEffect(() => {
    if (category && RCategory._id === "") {
      reset({
        title: category.title,
        icon: category.icon,
        color: category.color,
      });

      dispatch(
        saveCategory({
          _id: category._id,
          title: category.title,
          icon: toPascalCase(category.icon),
          color: category.color,
        })
      );

      setSelectedColor(category.color);
      setSelectedIcon(toPascalCase(category.icon));
    }
  }, [category]);

  useEffect(() => {
    if (id && RCategory._id === "") {
      const getCategory = async () => {
        try {
          const response = await CategoryByIdApi(id as string);
          setCategory(response);
        } catch (error) {
          console.log("error during fetching category:", error);
        }
      };
      getCategory();
    }
  }, [id]);

  const onSubmit = async (data: FormDataCategory) => {
    data.icon = toKebabCase(selectedIcon);
    data.color = selectedColor;

    try {
      let response;
      if (id) {
        response = await updateCategoryApi(id as string, data);
      } else {
        response = await createCategoryApi(data);
      }

      if (response.success) {
        router.push("/categories");
        dispatch(removeCategory());
      }
    } catch (error) {
      console.log("error during category creation:", error);
    }
  };



  const onSelectIcon = (name: string) => {
    setSelectedIcon(name);
    dispatch(saveCategory({ icon: name }));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    dispatch(saveCategory({ color: color }));
  };

  const handleNavigate = (e:React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      saveCategory({
        title: watch("title"),
      })
    );
    router.push("/categories/icon-catalog");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col  justify-center bg-white p-4 rounded-md mx-[21px] shadow-lg mb-10`}
    >
      <FormInput
        nameProp="title"
        placeholder="Title"
        requiredProp={true}
        control={control}
        errors={errors}
      />

      <label className="text-gray-700">Select Color</label>

      <div className="my-2">
        <ColorPicker value={selectedColor} onChange={handleColorChange} />
      </div>

      <label className="text-gray-700">Select Icon</label>

      <IconGrid
        iconsList={filteredIcons}
        onSelect={onSelectIcon}
        className="py-5"
        selected={selectedIcon}
        colorSelected={selectedColor && selectedColor}
      />

      <button
        onClick={handleNavigate}
        className="text-blue-500 cursor-pointer w-fit"
      >
        Show more
      </button>

      <Button
        className="w-full bg-blue-500 p-2 mt-4 mb-2 text-white rounded-3xl hover:bg-blue-600"
        type="submit"
        children={id ? "Update Category" : "Create Category"}
      />
    </form>
  );
};

export default CreateCategory;
